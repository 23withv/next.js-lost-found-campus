"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { submitReport } from "@/actions/items";
import { Loader2, UploadCloud, X, FileImage } from "lucide-react";

export function LostReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File size too large. Max 10MB allowed.");
        event.target.value = "";
        return;
      }

      if (!["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
        toast.error("Only JPG, JPEG, and PNG formats are allowed.");
        event.target.value = "";
        return;
      }

      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setPreview(null);
    setFileName(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append("type", "LOST");

    const result = await submitReport(formData);

    if (result?.error) {
      toast.error(result.error);
      setIsSubmitting(false);
    } else {
      toast.success("Lost report submitted successfully!");
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-t-4 border-t-blue-600">
      <CardHeader className="text-center space-y-1">
        <CardTitle className="text-3xl font-extrabold tracking-tight text-blue-600">
          Report a Missing Item
        </CardTitle>
        <CardDescription className="text-base">
          Provide as much detail as possible to help our team and other students identify your belongings.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="file"
            id="image-upload"
            name="image"
            ref={fileInputRef}
            className="hidden"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
          />

          <div className="space-y-2">
            <Label htmlFor="title">What did you lose?</Label>
            <Input 
              id="title" 
              name="title" 
              placeholder="e.g. Silver Macbook Air" 
              required 
              minLength={5}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Documents">Documents</SelectItem>
                <SelectItem value="Keys">Keys</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date Lost</Label>
              <Input 
                id="date" 
                name="date" 
                type="date" 
                required 
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Last Seen Location</Label>
              <Input 
                id="location" 
                name="location" 
                placeholder="e.g. Cafeteria, Library" 
                required 
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Photo (Optional)</Label>
            {!preview ? (
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:border-gray-700 transition-all group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-blue-600">Click to upload</span> (Max 10MB)
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative flex items-center p-3 border rounded-lg bg-background shadow-sm animate-in fade-in zoom-in duration-300">
                <div className="h-16 w-16 relative rounded-md overflow-hidden shrink-0 border bg-muted">
                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                </div>
                <div className="ml-4 flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileName}</p>
                  <p className="text-xs text-blue-600 flex items-center gap-1">
                    <FileImage className="w-3 h-3" /> Ready to upload
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-red-600 hover:bg-red-50"
                  onClick={handleRemoveFile}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Public Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              placeholder="Describe specific marks or details to help identification..." 
              required 
              minLength={10}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hiddenDetails" className="text-blue-600 font-semibold">
              Hidden Verification Details
            </Label>
            <Textarea 
              id="hiddenDetails" 
              name="hiddenDetails" 
              placeholder="E.g. Serial number, specific wallpaper, or item contents..." 
              required 
              className="border-blue-200 focus-visible:ring-blue-500"
              minLength={10}
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
            ) : (
              "Submit Lost Report"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}