"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { BlogCard } from "@/components/ui/blog-card";
import { useBlogModerationStore } from "@/lib/store/useBlogModerationStore";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { PenTool } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useRouter } from "next/navigation";

export default function BlogsPage() {
  const { blogs, submitBlog, fetchBlogs } = useBlogModerationStore();
  const { user } = useAuthStore();
  const router = useRouter();

  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);
  const [formData, setFormData] = React.useState({
    title: "",
    excerpt: "",
    content: "",
    tags: "",
    readTime: 5,
  });

  const approvedBlogs = blogs.filter(b => b.status === "approved");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return 90;
        return prev + 15;
      });
    }, 200);
    
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      
      submitBlog({
        title: formData.title,
        slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""),
        excerpt: formData.excerpt,
        content: formData.content,
        authorName: user ? `${user.firstName} ${user.lastName}` : "Anonymous Student",
        category: formData.tags.split(",")[0] || "General", // Use first tag as category
        rating: 0,
        tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
        readTime: Number(formData.readTime),
        // Keep these for the mock compatibility
        author: { name: user ? `${user.firstName} ${user.lastName}` : "Anonymous", avatar: "" },
        coverImage: "",
      });
      
      toast.success("Article submitted for review!");
      setIsModalOpen(false);
      setIsUploading(false);
      setUploadProgress(0);
      setFormData({ title: "", excerpt: "", content: "", tags: "", readTime: 5 });
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <AnimatedSection>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">Community Blogs</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
              Read stories, tutorials, and insights written by students and industry professionals.
            </p>
          </div>
          <Button onClick={() => {
            if (!user) {
              toast.error("Please login to submit an article.");
              router.push("/auth/login");
              return;
            }
            setIsModalOpen(true);
          }} variant="primary" className="gap-2 shrink-0">
            <PenTool size={16} /> Submit Article
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {approvedBlogs.map(blog => (
            <BlogCard key={blog.id} post={blog} />
          ))}
        </div>
        
        {approvedBlogs.length === 0 && (
          <div className="text-center py-24 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-2xl">
            <p className="text-[var(--text-muted)] text-lg">No approved articles yet. Be the first to submit!</p>
          </div>
        )}
      </AnimatedSection>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Submit an Article</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            Share your knowledge with the community. Your submission will be reviewed by an admin before it goes live.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Title</label>
              <Input required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Catchy title..." className="w-full bg-[var(--input-bg)]" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Excerpt (Short Summary)</label>
              <textarea required rows={2} value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none" placeholder="What is this article about?" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Tags (comma separated)</label>
                <Input required value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="React, Career, Tips" className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Est. Read Time (mins)</label>
                <Input type="number" min="1" required value={formData.readTime} onChange={(e) => setFormData({ ...formData, readTime: Number(e.target.value) })} className="w-full bg-[var(--input-bg)]" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[var(--foreground)]">Full Content (Markdown supported)</label>
              <textarea required rows={10} value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-y" placeholder="# Introduction&#10;&#10;Write your article here..." />
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-[var(--border-color)]">
              {isUploading && (
                <div className="w-full bg-[var(--alt-section)] rounded-full h-1.5 overflow-hidden border border-[var(--border-color)]">
                  <div className="bg-[var(--foreground)] h-full transition-all duration-200 ease-out" style={{ width: `${uploadProgress}%` }}></div>
                </div>
              )}
              <div className="flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} disabled={isUploading}>Cancel</Button>
                <Button type="submit" variant="primary" disabled={isUploading}>
                  {isUploading ? "Uploading..." : "Submit for Review"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
