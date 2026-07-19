"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Edit2, Trash2, Package, Upload, X, FileDown, CheckCircle2 } from "lucide-react";
import { useProductStore } from "@/lib/store/useProductStore";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Product } from "@/lib/data/products";
import { toast } from "sonner";
import { saveFile, deleteFile } from "@/lib/utils/fileStorage";

export default function DigitalProductsAdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Separate refs for each hidden file input
  const coverImageRef = React.useRef<HTMLInputElement>(null);
  const additionalImageRef = React.useRef<HTMLInputElement>(null);
  const productFileRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState({
    title: "",
    slug: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "ebooks",
    isFree: false,
    fileFormats: "PDF",
    coverImage: "" as string,
    additionalImages: [] as string[],
    downloadFile: null as Product["downloadFile"] | null,
  });

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => ({
    title: "", slug: "", description: "", price: 0, originalPrice: 0,
    category: "ebooks", isFree: false, fileFormats: "PDF", coverImage: "", additionalImages: [], downloadFile: null,
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(resetForm());
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      slug: product.slug,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      isFree: product.isFree,
      fileFormats: product.fileFormats.join(", "),
      coverImage: product.coverImage || "",
      additionalImages: product.images.filter(img => img !== product.coverImage),
      downloadFile: product.downloadFile || null,
    });
    setIsModalOpen(true);
  };

  // Cover image — converts to base64
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => setFormData((p) => ({ ...p, coverImage: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  // Additional preview image — converts to base64
  const handleAdditionalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { toast.error("Please select a valid image file."); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error("Image must be under 5MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
        setFormData(p => ({ ...p, additionalImages: [...p.additionalImages, ev.target?.result as string] }));
    };
    reader.readAsDataURL(file);
    if (additionalImageRef.current) additionalImageRef.current.value = "";
  };
  
  const removeAdditionalImage = (index: number) => {
    setFormData(p => ({
        ...p,
        additionalImages: p.additionalImages.filter((_, i) => i !== index)
    }));
  };

  // Downloadable product file — converts to base64
  const handleProductFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) { toast.error("Product file must be under 50MB."); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setFormData((p) => ({
        ...p,
        downloadFile: {
          name: file.name,
          dataUrl: ev.target?.result as string,
          size: file.size,
          type: file.type,
        },
      }));
      toast.success(`"${file.name}" ready to upload`);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await deleteFile(id); // also remove from IndexedDB
      deleteProduct(id);
      toast.success("Product deleted.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.coverImage || formData.additionalImages.length < 2) {
      toast.error("Please upload a cover image and at least 2 additional preview images (total 3 pics min).");
      return;
    }

    setIsSubmitting(true);
    const productId = editingProduct?.id ?? `p${Date.now()}`;

    // Save file to IndexedDB if a new file was picked (dataUrl is present)
    if (formData.downloadFile?.dataUrl) {
      await saveFile(productId, formData.downloadFile.dataUrl);
    }

    const productData = {
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
      description: formData.description,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category as Product["category"],
      isFree: formData.isFree,
      fileFormats: formData.fileFormats.split(",").map((s) => s.trim()),
      coverImage: formData.coverImage || undefined,
      // Store only metadata in DB for large files — NOT the dataUrl (that's in IndexedDB)
      downloadFile: formData.downloadFile
        ? { name: formData.downloadFile.name, size: formData.downloadFile.size, type: formData.downloadFile.type, dataUrl: "" }
        : undefined,
      images: [formData.coverImage, ...formData.additionalImages].filter(Boolean),
      features: ["Instant access", "Lifetime updates"],
      rating: editingProduct?.rating || 0,
      reviewCount: editingProduct?.reviewCount || 0,
    };

    try {
      if (editingProduct) { 
        await updateProduct(editingProduct.id, productData); 
        toast.success("Product updated!"); 
      } else { 
        await addProduct({ ...productData, id: productId } as any); 
        toast.success("Product created!"); 
      }
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Failed to save product.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format bytes to human-readable
  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Digital Products</h1>
          <p className="text-[var(--text-secondary)]">Manage your ebooks, templates, and downloadable resources.</p>
        </div>
        <Button variant="primary" className="gap-2 h-10" onClick={openAddModal}>
          <Plus size={16} /> New Product
        </Button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="px-6 py-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-8 pr-3 py-1.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--foreground)]" />
            </div>
            <Button variant="secondary" size="icon" className="h-8 w-8 rounded-md shrink-0"><Filter size={14} /></Button>
          </div>
          <p className="text-sm text-[var(--text-muted)]">Showing {filteredProducts.length} items</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--alt-section)] border-b border-[var(--border-color)]">
              <tr>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Cover</th>
                <th className="px-6 py-3 font-medium">File</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--alt-section)] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--alt-section)] border border-[var(--border-color)] flex items-center justify-center shrink-0 overflow-hidden">
                      {product.coverImage
                        ? <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
                        : <Package size={18} className="text-[var(--text-muted)]" />}
                    </div>
                    <div>
                      <p className="text-[var(--foreground)] font-medium">{product.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">/{product.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[var(--foreground)] text-[var(--background)] capitalize">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground)] font-medium">
                    {product.isFree ? "Free" : `₹${product.price.toFixed(2)}`}
                  </td>
                  <td className="px-6 py-4">
                    {product.coverImage
                      ? <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">✓ Cover</Badge>
                      : <Badge className="bg-[var(--alt-section)] text-[var(--text-muted)] border-transparent">No cover</Badge>}
                  </td>
                  <td className="px-6 py-4">
                    {product.downloadFile
                      ? <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">✓ {product.downloadFile.name.split(".").pop()?.toUpperCase()}</Badge>
                      : <Badge className="bg-[var(--alt-section)] text-[var(--text-muted)] border-transparent">No file</Badge>}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(product)} className="p-1.5 text-[var(--text-secondary)] hover:text-[var(--foreground)] bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(product.id, product.title)} className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-12 text-center text-[var(--text-muted)]">No products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
            {editingProduct ? "Edit Product" : "New Digital Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── SECTION 1: COVER IMAGE ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Cover Image</label>
              {formData.coverImage ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--border-color)]">
                  <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setFormData((p) => ({ ...p, coverImage: "" })); if (coverImageRef.current) coverImageRef.current.value = ""; }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80">
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 size={12} /> Cover uploaded
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => coverImageRef.current?.click()}
                  className="w-full aspect-video rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--alt-section)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 flex flex-col items-center justify-center gap-3 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--foreground)] transition-colors">
                    <Upload size={20} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[var(--foreground)]">Click to upload cover image</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG, WEBP — max 5MB</p>
                  </div>
                </button>
              )}
              <input ref={coverImageRef} type="file" accept="image/*" className="hidden" onChange={handleCoverImageChange} />
            </div>

            {/* ── SECTION 1.5: ADDITIONAL IMAGES ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Preview Images (Min 2 required)</label>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {formData.additionalImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-[var(--border-color)]">
                        <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeAdditionalImage(idx)}
                            className="absolute top-1.5 right-1.5 p-1 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors">
                            <X size={12} />
                        </button>
                    </div>
                ))}
                <button type="button" onClick={() => additionalImageRef.current?.click()}
                  className="aspect-square rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--alt-section)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 flex flex-col items-center justify-center transition-all group">
                  <div className="w-10 h-10 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--foreground)] transition-colors">
                    <Plus size={18} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)]" />
                  </div>
                </button>
              </div>
              <input ref={additionalImageRef} type="file" accept="image/*" className="hidden" onChange={handleAdditionalImageChange} />
            </div>

            {/* ── SECTION 2: DOWNLOADABLE FILE ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Downloadable Product File</label>
              {formData.downloadFile ? (
                <div className="flex items-center gap-4 p-4 rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
                  <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/40 flex items-center justify-center shrink-0">
                    <FileDown size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--foreground)] truncate">{formData.downloadFile.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{formatBytes(formData.downloadFile.size)} · {formData.downloadFile.type || "Unknown type"}</p>
                  </div>
                  <button type="button" onClick={() => { setFormData((p) => ({ ...p, downloadFile: null })); if (productFileRef.current) productFileRef.current.value = ""; }}
                    className="p-1.5 text-[var(--text-muted)] hover:text-red-500 rounded-md transition-colors shrink-0">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => productFileRef.current?.click()}
                  className="w-full p-6 rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--alt-section)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 flex items-center gap-4 transition-all group text-left">
                  <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center shrink-0 group-hover:border-[var(--foreground)] transition-colors">
                    <FileDown size={20} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">Click to upload product file</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">PDF, ZIP, EPUB, Notion — max 50MB</p>
                  </div>
                </button>
              )}
              <input ref={productFileRef} type="file" accept=".pdf,.zip,.epub,.docx,.pptx,.key,.sketch,.fig,.notion,.md" className="hidden" onChange={handleProductFileChange} />
            </div>

            {/* ── SECTION 3: FIELDS ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Title</label>
              <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Next.js Mastery Guide" className="w-full bg-[var(--input-bg)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-[var(--foreground)] text-sm">
                  <option value="ebooks">eBooks</option>
                  <option value="templates">Templates</option>
                  <option value="kits">Kits</option>
                  <option value="notes">Notes</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">File Formats</label>
                <Input value={formData.fileFormats} onChange={(e) => setFormData({ ...formData, fileFormats: e.target.value })} placeholder="PDF, Notion" className="w-full bg-[var(--input-bg)]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Price (₹)</label>
                <Input type="number" step="0.01" min="0" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full bg-[var(--input-bg)]" disabled={formData.isFree} />
              </div>
              <div className="flex flex-col justify-end pb-0.5">
                <label className="flex items-center gap-2 text-sm text-[var(--foreground)] cursor-pointer pb-2 select-none">
                  <input type="checkbox" checked={formData.isFree} onChange={(e) => setFormData({ ...formData, isFree: e.target.checked, price: 0 })} className="rounded" />
                  Product is Free
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-[var(--foreground)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none" placeholder="Product description..." />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">{editingProduct ? "Save Changes" : "Create Product"}</Button>
            </div>
          </form>
        </div>
      </Modal>
    </AnimatedSection>
  );
}
