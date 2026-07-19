"use client";

import * as React from "react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Plus, Search, Edit2, Trash2, Target, GripVertical } from "lucide-react";
import { Roadmap, RoadmapNode } from "@/lib/data/roadmaps";
import { useRoadmapStore } from "@/lib/store/useRoadmapStore";
import { toast } from "sonner";

export default function RoadmapsAdminPage() {
  const { roadmaps, addRoadmap, updateRoadmap, deleteRoadmap, fetchRoadmaps } = useRoadmapStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    fetchRoadmaps();
    setMounted(true);
  }, [fetchRoadmaps]);

  const [search, setSearch] = React.useState("");
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingRoadmap, setEditingRoadmap] = React.useState<Roadmap | null>(null);
  
  const [form, setForm] = React.useState({ 
    title: "", 
    slug: "", 
    description: "", 
    difficulty: "beginner" as Roadmap["difficulty"], 
    estimatedTime: "",
    nodes: [] as Omit<RoadmapNode, "id">[] 
  });

  const filtered = roadmaps.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()));

  const openAdd = () => { 
    setEditingRoadmap(null); 
    setForm({ title: "", slug: "", description: "", difficulty: "beginner", estimatedTime: "", nodes: [] }); 
    setIsModalOpen(true); 
  };
  
  const openEdit = (r: Roadmap) => { 
    setEditingRoadmap(r); 
    setForm({ 
      title: r.title, 
      slug: r.slug, 
      description: r.description, 
      difficulty: r.difficulty, 
      estimatedTime: r.estimatedTime,
      nodes: [...r.nodes] // copy array
    }); 
    setIsModalOpen(true); 
  };

  const handleAddNode = () => {
    setForm(prev => ({
      ...prev,
      nodes: [...prev.nodes, { title: "", description: "" }]
    }));
  };

  const handleUpdateNode = (index: number, field: "title" | "description", value: string) => {
    setForm(prev => {
      const updatedNodes = [...prev.nodes];
      updatedNodes[index] = { ...updatedNodes[index], [field]: value };
      return { ...prev, nodes: updatedNodes };
    });
  };

  const handleRemoveNode = (index: number) => {
    setForm(prev => ({
      ...prev,
      nodes: prev.nodes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Assign IDs to new nodes, preserve existing ones if editing
    const processedNodes: RoadmapNode[] = form.nodes.map((n, i) => ({
      id: (n as RoadmapNode).id || `n${Date.now()}-${i}`,
      title: n.title,
      description: n.description,
      status: n.status
    }));

    const data = { 
      title: form.title, 
      difficulty: form.difficulty, 
      description: form.description,
      estimatedTime: form.estimatedTime,
      slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""), 
      nodes: processedNodes
    };
    
    if (editingRoadmap) { 
      updateRoadmap(editingRoadmap.id, data); 
      toast.success("Roadmap updated!"); 
    } else { 
      addRoadmap(data); 
      toast.success("Roadmap created!"); 
    }
    setIsModalOpen(false);
  };

  return (
    <AnimatedSection>
      <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">Roadmaps</h1>
          <p className="text-[var(--text-secondary)]">Manage learning paths and curriculum steps.</p>
        </div>
        <Button variant="primary" className="gap-2 h-10" onClick={openAdd}>
          <Plus size={16} /> Create Roadmap
        </Button>
      </div>

      <div className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
        <div className="px-6 py-5 border-b border-[var(--border-color)] flex items-center justify-between gap-4">
          <div className="relative w-full max-w-sm">
            <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input type="text" placeholder="Search roadmaps..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB]" />
          </div>
          <p className="text-sm text-[var(--text-muted)] shrink-0">{filtered.length} roadmaps</p>
        </div>

        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-[var(--text-muted)] uppercase bg-[var(--alt-section)] border-b border-[var(--border-color)]">
              <tr>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Difficulty</th>
                <th className="px-6 py-3 font-medium">Est. Time</th>
                <th className="px-6 py-3 font-medium">Steps</th>
                <th className="px-6 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-[var(--alt-section)] transition-colors group">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[var(--alt-section)] border border-[var(--border-color)] flex items-center justify-center shrink-0">
                      <Target size={16} className="text-[var(--text-muted)]" />
                    </div>
                    <div>
                      <p className="font-medium text-[var(--foreground)]">{r.title}</p>
                      <p className="text-xs text-[var(--text-muted)]">/{r.slug}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge className={
                      r.difficulty === "beginner" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" :
                      r.difficulty === "intermediate" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" :
                      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
                    }>{r.difficulty}</Badge>
                  </td>
                  <td className="px-6 py-4 text-[var(--text-secondary)]">{r.estimatedTime}</td>
                  <td className="px-6 py-4 text-[var(--foreground)] font-medium">{r.nodes.length}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(r)} className="p-1.5 text-[var(--text-secondary)] hover:text-[#2563EB] bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"><Edit2 size={14} /></button>
                      <button onClick={() => { if (window.confirm(`Delete "${r.title}"?`)) { deleteRoadmap(r.id); toast.success("Roadmap deleted"); } }}
                        className="p-1.5 text-[var(--text-secondary)] hover:text-red-500 bg-[var(--alt-section)] rounded-md border border-[var(--border-color)]"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No roadmaps found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-6 max-h-[90vh] overflow-y-auto">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">{editingRoadmap ? "Edit Roadmap" : "New Roadmap"}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider border-b border-[var(--border-color)] pb-2">Overview</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Title</label>
                <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Full Stack Web Development" className="w-full bg-[var(--input-bg)]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">Difficulty</label>
                  <select value={form.difficulty} onChange={(e) => setForm({ ...form, difficulty: e.target.value as Roadmap["difficulty"] })}
                    className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB]">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--foreground)]">Estimated Time</label>
                  <Input required value={form.estimatedTime} onChange={(e) => setForm({ ...form, estimatedTime: e.target.value })} placeholder="e.g. 12 weeks" className="w-full bg-[var(--input-bg)]" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[var(--foreground)]">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 bg-[var(--input-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none" placeholder="Roadmap description..." />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
                <h3 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider">Roadmap Steps (Nodes)</h3>
                <Button type="button" variant="secondary" size="sm" onClick={handleAddNode} className="h-8 gap-1">
                  <Plus size={14} /> Add Step
                </Button>
              </div>

              <div className="space-y-3">
                {form.nodes.length === 0 ? (
                  <div className="text-center py-8 bg-[var(--alt-section)] border border-dashed border-[var(--border-color)] rounded-xl">
                    <p className="text-sm text-[var(--text-muted)]">No steps added yet. Add steps to define the learning path.</p>
                  </div>
                ) : (
                  form.nodes.map((node, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-[var(--alt-section)] border border-[var(--border-color)] rounded-xl group">
                      <div className="mt-2 text-[var(--text-muted)] opacity-50 shrink-0">
                        <GripVertical size={16} />
                      </div>
                      <div className="flex-1 space-y-3">
                        <Input 
                          required 
                          value={node.title} 
                          onChange={(e) => handleUpdateNode(idx, "title", e.target.value)} 
                          placeholder={`Step ${idx + 1} Title`} 
                          className="bg-[var(--card)]"
                        />
                        <textarea 
                          required 
                          rows={2} 
                          value={node.description} 
                          onChange={(e) => handleUpdateNode(idx, "description", e.target.value)}
                          className="w-full px-3 py-2 bg-[var(--card)] border border-[var(--border-color)] rounded-md text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[#2563EB] resize-none" 
                          placeholder="What will they learn in this step?" 
                        />
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveNode(idx)}
                        className="mt-1 p-1.5 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border-color)] sticky bottom-0 bg-[var(--card)] mt-auto -mx-6 -mb-6 p-6">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button type="submit" variant="primary">{editingRoadmap ? "Save Changes" : "Create Roadmap"}</Button>
            </div>
          </form>
        </div>
      </Modal>
    </AnimatedSection>
  );
}
