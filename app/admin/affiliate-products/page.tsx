"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, Edit2, Trash2, Link as LinkIcon, Upload, X, CheckCircle2 } from "lucide-react";
import { useAffiliateStore } from "@/lib/store/useAffiliateStore";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { AffiliateProduct } from "@/lib/data/affiliates";
import { toast } from "sonner";

export default function AffiliateProductsAdminPage() {
  const { products, addProduct, updateProduct, deleteProduct, fetchProducts } = useAffiliateStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    fetchProducts();
    setMounted(true);
  }, [fetchProducts]);

  const [searchQuery, setSearchQuery] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<AffiliateProduct | null>(null);

  const coverImageRef = React.useRef<HTMLInputElement>(null);

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    price: 0,
    originalPrice: 0,
    category: "gear" as AffiliateProduct["category"],
    platform: "Amazon" as AffiliateProduct["platform"],
    url: "",
    imageUrl: "" as string,
  });

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => ({
    title: "", description: "", price: 0, originalPrice: 0,
    category: "gear" as AffiliateProduct["category"], 
    platform: "Amazon" as AffiliateProduct["platform"], 
    url: "", imageUrl: "",
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(resetForm());
    setIsModalOpen(true);
  };

  const openEditModal = (product: AffiliateProduct) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      originalPrice: product.originalPrice || 0,
      category: product.category,
      platform: product.platform,
      url: product.url,
      imageUrl: product.imageUrl,
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
    reader.onload = (ev) => setFormData((p) => ({ ...p, imageUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"?`)) { deleteProduct(id); toast.success("Affiliate product deleted."); }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      category: formData.category,
      platform: formData.platform,
      url: formData.url,
      imageUrl: formData.imageUrl,
    };

    if (editingProduct) { 
      updateProduct(editingProduct.id, productData); 
      toast.success("Affiliate product updated!"); 
    } else { 
      addProduct(productData); 
      toast.success("Affiliate product created!"); 
    }
    setIsModalOpen(false);
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Affiliate Products</h1>
          <p className="text-[var(--text-secondary)]">Manage your curated gear and partner links.</p>
        </div>
        <Button variant="primary" className="gap-2 h-10" onClick={openAddModal}>
          <Plus size={16} /> Add Affiliate Link
        </Button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        {/* Toolbar */}
        <div className="px-6 py-5 border-b border-[var(--border-color)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input type="text" placeholder="Search affiliate products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
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
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-[var(--alt-section)] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--alt-section)] border border-[var(--border-color)] flex items-center justify-center shrink-0 overflow-hidden">
                      {product.imageUrl
                        ? <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                        : <LinkIcon size={18} className="text-[var(--text-muted)]" />}
                    </div>
                    <div className="max-w-[200px] sm:max-w-[300px]">
                      <p className="text-[var(--foreground)] font-medium truncate">{product.title}</p>
                      <a href={product.url} target="_blank" rel="noopener noreferrer" className="text-xs text-[var(--foreground)] hover:underline truncate block">
                        {product.url?.replace(/^https?:\/\/(www\.)?/, '')}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[var(--foreground)] text-[var(--background)] capitalize">{product.category}</Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--foreground)] font-medium">
                    ₹{product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge className="bg-[var(--foreground)] text-[var(--background)] capitalize">{product.platform}</Badge>
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
                <tr><td colSpan={5} className="px-6 py-12 text-center text-[var(--text-muted)]">No affiliate products found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">
            {editingProduct ? "Edit Affiliate Product" : "New Affiliate Product"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* ── SECTION 1: COVER IMAGE ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Product Image</label>
              {formData.imageUrl ? (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--border-color)]">
                  <img src={formData.imageUrl} alt="Cover" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => { setFormData((p) => ({ ...p, imageUrl: "" })); if (coverImageRef.current) coverImageRef.current.value = ""; }}
                    className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-full hover:bg-black/80">
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 size={12} /> Image uploaded
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => coverImageRef.current?.click()}
                  className="w-full aspect-video rounded-xl border-2 border-dashed border-[var(--border-color)] bg-[var(--alt-section)] hover:border-[var(--foreground)] hover:bg-[var(--foreground)]/5 flex flex-col items-center justify-center gap-3 transition-all group">
                  <div className="w-12 h-12 rounded-full bg-[var(--card)] border border-[var(--border-color)] flex items-center justify-center group-hover:border-[var(--foreground)] transition-colors">
                    <Upload size={20} className="text-[var(--text-muted)] group-hover:text-[var(--foreground)]" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-[var(--foreground)]">Click to upload product image</p>
                    <p className="text-xs text-[var(--text-muted)] mt-1">PNG, JPG, WEBP — max 5MB</p>
                  </div>
                </button>
              )}
              <input ref={coverImageRef} type="file" accept="image/*" className="hidden" onChange={handleCoverImageChange} />
            </div>

            {/* ── SECTION 3: FIELDS ── */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Title</label>
              <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. Sony WH-1000XM5" className="w-full bg-[var(--input-bg)]" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Affiliate Link</label>
              <Input required type="url" value={formData.url} onChange={(e) => setFormData({ ...formData, url: e.target.value })} placeholder="https://amazon.com/dp/..." className="w-full bg-[var(--input-bg)]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Platform</label>
                <select value={formData.platform} onChange={(e) => setFormData({ ...formData, platform: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-[var(--foreground)] text-sm">
                  <option value="Amazon">Amazon</option>
                  <option value="Coursera">Coursera</option>
                  <option value="Udemy">Udemy</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Category</label>
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-[var(--foreground)] text-sm">
                  <option value="gear">Gear</option>
                  <option value="courses">Courses</option>
                  <option value="books">Books</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Price (₹)</label>
                <Input type="number" step="0.01" min="0" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Original Price (₹) (Optional)</label>
                <Input type="number" step="0.01" min="0" value={formData.originalPrice} onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })} className="w-full bg-[var(--input-bg)]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Description</label>
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-[var(--foreground)] text-sm focus:outline-none focus:ring-1 focus:ring-[var(--foreground)] resize-none" placeholder="Short description of the product..." />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)]">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">{editingProduct ? "Save Changes" : "Add Affiliate"}</Button>
            </div>
          </form>
        </div>
      </Modal>
    </AnimatedSection>
  );
}
