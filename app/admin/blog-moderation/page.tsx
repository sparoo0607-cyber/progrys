"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Trash2, Clock, Eye } from "lucide-react";
import { useBlogModerationStore } from "@/lib/store/useBlogModerationStore";
import { toast } from "sonner";
import { Modal } from "@/components/ui/modal";

export default function BlogModerationAdminPage() {
  const { blogs, approve, reject, delete: deleteBlog, fetchBlogs } = useBlogModerationStore();
  const [filter, setFilter] = React.useState<"pending" | "approved" | "rejected">("pending");
  const [previewBlog, setPreviewBlog] = React.useState<typeof blogs[0] | null>(null);

  React.useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filtered = blogs.filter((b) => b.status === filter);
  const pendingCount = blogs.filter((b) => b.status === "pending").length;

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Blog Moderation</h1>
          <p className="text-[var(--text-secondary)]">Review and approve community-submitted articles.</p>
        </div>
        {pendingCount > 0 && (
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400 text-sm px-3 py-1 h-fit">
            {pendingCount} awaiting review
          </Badge>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {(["pending", "approved", "rejected"] as const).map((s) => {
          const count = blogs.filter((b) => b.status === s).length;
          const colors: Record<string, string> = {
            pending: "text-orange-600",
            approved: "text-green-600",
            rejected: "text-red-500",
          };
          return (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`bg-[var(--card)] border rounded-xl p-5 text-left shadow-sm transition-all ${filter === s ? "border-[var(--foreground)] ring-2 ring-[var(--foreground)]/20" : "border-[var(--card-border)] hover:border-[var(--foreground)]"}`}
            >
              <p className={`text-3xl font-bold ${colors[s]}`}>{count}</p>
              <p className="text-sm text-[var(--text-muted)] capitalize mt-1">{s}</p>
            </button>
          );
        })}
      </div>

      {/* Blog List */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-16 text-center text-[var(--text-muted)]">
            No {filter} submissions.
          </div>
        )}
        {filtered.map((blog) => (
          <div key={blog.id} className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row sm:items-start gap-4">
            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {blog.tags?.map((tag: string) => (
                  <Badge key={tag} className="bg-[var(--alt-section)] text-[var(--text-muted)] border-transparent text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              <h3 className="font-bold text-lg text-[var(--foreground)] mb-1">{blog.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-3">{blog.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                <span>By <strong className="text-[var(--foreground)]">{(blog as any).authorName || (blog as any).author?.name}</strong></span>
                <span className="flex items-center gap-1"><Clock size={12} /> {(blog as any).readTime || 5} min read</span>
                <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => setPreviewBlog(blog)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] bg-[var(--alt-section)] border border-[var(--border-color)] rounded-lg transition-colors"
              >
                <Eye size={14} /> Preview
              </button>
              {blog.status === "pending" && (
                <>
                  <button
                    onClick={() => { approve(blog.id); toast.success("Blog approved and published!"); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-700 bg-green-100 hover:bg-green-200 dark:text-green-400 dark:bg-green-900/30 dark:hover:bg-green-900/50 rounded-lg transition-colors"
                  >
                    <CheckCircle2 size={14} /> Approve
                  </button>
                  <button
                    onClick={() => { reject(blog.id); toast.info("Blog rejected."); }}
                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-700 bg-red-100 hover:bg-red-200 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                  >
                    <XCircle size={14} /> Reject
                  </button>
                </>
              )}
              <button
                onClick={() => { if (window.confirm("Delete this blog?")) { deleteBlog(blog.id); toast.success("Blog deleted."); } }}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-red-500 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-lg transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      <Modal isOpen={!!previewBlog} onClose={() => setPreviewBlog(null)}>
        {previewBlog && (
          <div className="p-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {previewBlog.tags?.map((tag: string) => (
                <Badge key={tag} className="bg-[var(--alt-section)] text-[var(--text-muted)] border-transparent text-xs">{tag}</Badge>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-3">{previewBlog.title}</h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{previewBlog.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] border-t border-[var(--border-color)] pt-4">
              <span>By <strong className="text-[var(--foreground)]">{(previewBlog as any).authorName || (previewBlog as any).author?.name}</strong></span>
              <span>{(previewBlog as any).readTime || 5} min read</span>
              <Badge className={
                previewBlog.status === "pending" ? "bg-orange-100 text-orange-800" :
                previewBlog.status === "approved" ? "bg-green-100 text-green-800" :
                "bg-red-100 text-red-800"
              }>{previewBlog.status}</Badge>
            </div>
          </div>
        )}
      </Modal>
    </AnimatedSection>
  );
}
