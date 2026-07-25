"use client";

import { use } from "react";
import { useProductStore } from "@/lib/store/useProductStore";
import { notFound, useRouter } from "next/navigation";
import { ShieldCheck, Download, Info, Image as ImageIcon, ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useWishlistStore } from "@/lib/store/useWishlistStore";
import { toast } from "sonner";
import { getFile } from "@/lib/utils/fileStorage";
import * as React from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const { hasProduct, toggleProduct } = useWishlistStore();
  const { getProductBySlug, updateProduct } = useProductStore();
  
  const resolvedParams = use(params);
  const product = getProductBySlug(resolvedParams.slug);

  const [activeImage, setActiveImage] = React.useState<string | null>(null);
  const [voteStatus, setVoteStatus] = React.useState<"like" | "dislike" | null>(null);
  const [isVoting, setIsVoting] = React.useState(false);
  
  const isWishlisted = product ? hasProduct(product.id) : false;

  const displayImages = React.useMemo(() => {
    if (!product) return [];
    const all = [];
    if (product.coverImage) all.push(product.coverImage);
    if (product.images) {
      all.push(...product.images.filter(img => img !== product.coverImage));
    }
    return all;
  }, [product]);

  React.useEffect(() => {
    if (product && !activeImage && displayImages.length > 0) {
      setActiveImage(displayImages[0]);
    }
    if (product) {
      const stored = localStorage.getItem(`vote_${product.id}`);
      if (stored === "like" || stored === "dislike") {
        setVoteStatus(stored);
      }
    }
  }, [product, activeImage, displayImages]);

  const handleVote = async (type: "like" | "dislike") => {
    if (!product || isVoting) return;
    
    setIsVoting(true);
    const previousVote = voteStatus;
    let newLikes = product.likes || 0;
    let newDislikes = product.dislikes || 0;
    
    if (voteStatus === type) {
      // Un-vote
      setVoteStatus(null);
      localStorage.removeItem(`vote_${product.id}`);
      
      if (type === "like") {
        newLikes = Math.max(0, newLikes - 1);
      } else {
        newDislikes = Math.max(0, newDislikes - 1);
      }
    } else {
      // Switch vote or new vote
      setVoteStatus(type);
      localStorage.setItem(`vote_${product.id}`, type);
      
      if (type === "like") {
        newLikes++;
        if (previousVote === "dislike") newDislikes = Math.max(0, newDislikes - 1);
      } else {
        newDislikes++;
        if (previousVote === "like") newLikes = Math.max(0, newLikes - 1);
      }
    }
    
    try {
      await updateProduct(product.id, { likes: newLikes, dislikes: newDislikes });
    } catch (err) {
      toast.error("Failed to register vote.");
      setVoteStatus(previousVote);
      if (previousVote) localStorage.setItem(`vote_${product.id}`, previousVote);
      else localStorage.removeItem(`vote_${product.id}`);
    } finally {
      setIsVoting(false);
    }
  };

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 h-fit sticky top-24">
          {displayImages.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto md:w-24 shrink-0 pb-2 md:pb-0 md:max-h-[600px] custom-scrollbar">
              {displayImages.map((img, idx) => (
                <button 
                  key={idx} 
                  onMouseEnter={() => setActiveImage(img)}
                  onClick={() => setActiveImage(img)}
                  className={`aspect-square w-20 md:w-full shrink-0 rounded-xl border flex items-center justify-center cursor-pointer transition-all overflow-hidden bg-[var(--card)] ${
                    activeImage === img ? "border-[var(--foreground)] ring-2 ring-[var(--foreground)]/20" : "border-[var(--border-color)] hover:border-[var(--foreground)] opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
          <div className="flex-1 aspect-[4/3] md:aspect-[4/4] bg-[var(--alt-section)] rounded-2xl border border-[var(--border-color)] relative overflow-hidden">
            {activeImage ? (
              <img src={activeImage} alt={product.title} className="w-full h-full object-cover transition-opacity duration-300" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <ImageIcon className="text-[var(--text-muted)]" size={32} />
                <span className="text-[var(--text-muted)] font-medium text-sm">No images uploaded</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <Badge className="w-fit mb-4 bg-[var(--foreground)] text-[var(--background)] capitalize">{product.category}</Badge>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-[var(--foreground)] tracking-tight">{product.title}</h1>
            <button 
              onClick={() => {
                toggleProduct(product.id);
                toast.success(isWishlisted ? "Removed bookmark" : "Added bookmark");
              }}
              className="p-3 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-full hover:scale-110 active:scale-95 transition-all shadow-sm shrink-0"
              title={isWishlisted ? "Remove bookmark" : "Add bookmark"}
            >
              <Bookmark size={24} className={isWishlisted ? "fill-[var(--foreground)] text-[var(--foreground)]" : "text-[var(--text-secondary)] hover:text-[var(--foreground)]"} />
            </button>
          </div>
          
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleVote("like")}
                disabled={isVoting}
                className={`flex items-center gap-1.5 transition-colors group ${voteStatus === "like" ? "text-green-500" : "text-[var(--text-muted)] hover:text-green-500"} ${isVoting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ThumbsUp size={16} className={`transition-transform ${voteStatus === "like" ? "fill-green-500" : "group-hover:-translate-y-0.5"}`} />
                <span className="font-medium text-sm">{product.likes || 0}</span>
              </button>
              <button 
                onClick={() => handleVote("dislike")}
                disabled={isVoting}
                className={`flex items-center gap-1.5 transition-colors group ${voteStatus === "dislike" ? "text-[#EF4444]" : "text-[var(--text-muted)] hover:text-[#EF4444]"} ${isVoting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <ThumbsDown size={16} className={`transition-transform ${voteStatus === "dislike" ? "fill-[#EF4444]" : "group-hover:translate-y-0.5"}`} />
                <span className="font-medium text-sm">{product.dislikes || 0}</span>
              </button>
            </div>
            <div className="text-[var(--text-muted)]">|</div>
            <div className="text-[var(--text-muted)]">Updated: {new Date(product.updatedAt).toLocaleDateString()}</div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-4xl font-bold text-[var(--foreground)]">
                {product.isFree ? "Free" : `₹${product.price.toFixed(2)}`}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[var(--text-muted)] line-through">₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-6">
              {product.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row mb-8">
              {product.isFree ? (
                <Button
                  size="lg"
                  variant="primary"
                  className="flex-1"
                  onClick={async () => {
                    if (!product.downloadFile) {
                      toast.info("No download file attached to this product yet.");
                      return;
                    }
                    const dataUrl = await getFile(product.id);
                    if (!dataUrl) {
                      toast.info("Download file not found. The admin may need to re-upload it.");
                      return;
                    }
                    const a = document.createElement("a");
                    a.href = dataUrl;
                    a.download = product.downloadFile.name;
                    a.click();
                    toast.success(`Downloading ${product.downloadFile.name}...`);
                  }}
                >
                  <Download className="mr-2" size={20} /> Download Now (Free)
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg" 
                    variant="secondary" 
                    className="flex-1"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.error("Please login to add to cart");
                        router.push("/auth/login");
                        return;
                      }
                      addItem(product);
                      toast.success(`${product.title} added to cart!`);
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button 
                    size="lg" 
                    variant="primary" 
                    className="flex-1"
                    onClick={() => {
                      if (!isLoggedIn) {
                        toast.error("Please login to purchase");
                        router.push("/auth/login");
                        return;
                      }
                      addItem(product);
                      router.push("/checkout");
                    }}
                  >
                    Buy Now
                  </Button>
                </>
              )}
            </div>
            
            {/* Friendly Policy Blocks */}
            <div className="bg-[var(--alt-section)] rounded-xl p-4 border border-[var(--border-color)] space-y-3">
              {!product.isFree && (
                <div className="flex gap-3 items-start">
                  <Info className="text-[var(--text-muted)] shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-[var(--text-secondary)]">
                    <strong className="text-[var(--foreground)] block mb-0.5">Instant Access</strong>
                    Because this is a digital download, once it's unlocked we can't offer refunds. If anything looks off, contact us — we'll fix it.
                  </p>
                </div>
              )}
              <div className="flex gap-3 items-start">
                <ShieldCheck className="text-[var(--text-muted)] shrink-0 mt-0.5" size={18} />
                <p className="text-sm text-[var(--text-secondary)]">
                  <strong className="text-[var(--foreground)] block mb-0.5">Secure Checkout</strong>
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </div>
          </div>
          
          {/* What's included */}
          {product.features && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">What's included</h3>
              <ul className="space-y-3">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-[var(--text-secondary)]">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--foreground)]" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {product.fileFormats.map(format => (
                  <Badge key={format} variant="secondary" className="bg-[var(--alt-section)] text-[var(--text-muted)] border-transparent">
                    {format} format
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
