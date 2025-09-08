"use client"

import { useState } from "react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Card } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import {
  Search,
  Upload,
  Grid3X3,
  List,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  MoreVertical,
  Home,
  Users,
  Star,
  Trash2,
  Settings,
  ChevronRight,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"

interface FileItem {
  id: string
  name: string
  type: "folder" | "file"
  fileType?: "document" | "image" | "video" | "audio"
  size?: string
  modified: string
  url?: string
  children?: FileItem[]
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Documents",
    type: "folder",
    modified: "2 days ago",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.pdf",
        type: "file",
        fileType: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        url: "/files/proposal.pdf",
      },
      {
        id: "1-2",
        name: "Meeting Notes.docx",
        type: "file",
        fileType: "document",
        size: "156 KB",
        modified: "3 hours ago",
        url: "/files/notes.docx",
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    children: [
      {
        id: "2-1",
        name: "vacation-beach.jpg",
        type: "file",
        fileType: "image",
        size: "4.2 MB",
        modified: "1 week ago",
        url: "/images/beach.jpg",
      },
      {
        id: "2-2",
        name: "family-dinner.png",
        type: "file",
        fileType: "image",
        size: "3.1 MB",
        modified: "5 days ago",
        url: "/images/dinner.png",
      },
    ],
  },
  {
    id: "3",
    name: "Videos",
    type: "folder",
    modified: "3 days ago",
    children: [
      {
        id: "3-1",
        name: "presentation-demo.mp4",
        type: "file",
        fileType: "video",
        size: "45.2 MB",
        modified: "2 days ago",
        url: "/videos/demo.mp4",
      },
    ],
  },
  {
    id: "4",
    name: "Budget Spreadsheet.xlsx",
    type: "file",
    fileType: "document",
    size: "892 KB",
    modified: "4 hours ago",
    url: "/files/budget.xlsx",
  },
  {
    id: "5",
    name: "Logo Design.ai",
    type: "file",
    fileType: "image",
    size: "1.2 MB",
    modified: "1 day ago",
    url: "/files/logo.ai",
  },
  {
    id: "6",
    name: "Background Music.mp3",
    type: "file",
    fileType: "audio",
    size: "5.8 MB",
    modified: "2 weeks ago",
    url: "/audio/music.mp3",
  },
]

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") return <Folder className="h-8 w-8 text-blue-500" />

    switch (item.fileType) {
      case "document":
        return <FileText className="h-8 w-8 text-red-500" />
      case "image":
        return <ImageIcon className="h-8 w-8 text-green-500" />
      case "video":
        return <Video className="h-8 w-8 text-purple-500" />
      case "audio":
        return <Music className="h-8 w-8 text-orange-500" />
      default:
        return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder" && item.children) {
      setCurrentPath([...currentPath, item.name])
      setCurrentItems(item.children)
    } else if (item.url) {
      // Open file in new tab
      window.open(item.url, "_blank")
    }
  }

  const navigateToPath = (index: number) => {
    if (index === 0) {
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    } else {
      // Navigate back to specific folder level
      const newPath = currentPath.slice(0, index + 1)
      setCurrentPath(newPath)
      // This would need more complex logic to navigate back through nested folders
      // For demo purposes, just go back to root
      if (newPath.length === 1) {
        setCurrentItems(mockData)
      }
    }
  }

  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-foreground">Drive</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search in Drive"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-96 pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
              {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New
            </Button>
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Sidebar */}
        <aside className="w-64 h-full border-r border-border bg-card p-4">
          <nav className="space-y-2">
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
              <Home className="h-4 w-4" />
              My Drive
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
              <Users className="h-4 w-4" />
              Shared with me
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
              <Star className="h-4 w-4" />
              Starred
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
              <Trash2 className="h-4 w-4" />
              Trash
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-3 text-foreground hover:bg-accent">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>

          <div className="mt-8">
            <div className="text-sm text-muted-foreground mb-2">Storage</div>
            <div className="bg-muted rounded-full h-2 mb-2">
              <div className="bg-primary h-2 rounded-full w-3/4"></div>
            </div>
            <div className="text-xs text-muted-foreground">7.5 GB of 15 GB used</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-2">
                <button
                  onClick={() => navigateToPath(index)}
                  className="text-foreground hover:text-primary font-medium"
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
              </div>
            ))}
          </div>

          {/* File Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 cursor-pointer hover:bg-accent/50 transition-colors group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {getFileIcon(item)}
                    <div className="text-sm font-medium text-center text-balance line-clamp-2">{item.name}</div>
                    {item.size && (
                      <Badge variant="secondary" className="text-xs">
                        {item.size}
                      </Badge>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Share</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 cursor-pointer hover:bg-accent/50 transition-colors group"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(item)}
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Modified {item.modified}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {item.size && <Badge variant="secondary">{item.size}</Badge>}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Share</DropdownMenuItem>
                          <DropdownMenuItem>Download</DropdownMenuItem>
                          <DropdownMenuItem>Rename</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground">No files found</div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
