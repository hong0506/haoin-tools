# 🔧 Tools Update Guide - Remaining 8 Tools

## ✅ Already Completed (2/10)
1. ✅ **TextReplacer.tsx** - Fully updated with all cards
2. ✅ **DuplicateRemover.tsx** - Fully updated with all cards

## ⏳ Remaining Tools (8/10)

Due to the large file sizes (400-500 lines each), I'm providing a structured approach to complete the remaining 8 tools efficiently.

### Tools to Update:
3. JsonToCsv.tsx (needs recreation)
4. XmlToJson.tsx (needs recreation)
5. MarkdownToHtml.tsx
6. TipCalculator.tsx
7. DiscountCalculator.tsx
8. RandomNumber.tsx
9. JwtDecoder.tsx
10. SqlFormatter.tsx

### Updates Required for Each Tool:

#### 1. Fix Header (lines ~88-108)
```tsx
// OLD:
<header>
  <div className="flex h-16 items-center gap-4 px-6">
    <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
      <ArrowLeft className="h-4 w-4" />
    </Button>
    <SidebarTrigger />
    <h1>Tool Name</h1>
    <div className="ml-auto">
      <FavoriteButton toolId="..." toolName="..." />
    </div>
  </div>
</header>

// NEW:
<header>
  <div className="flex h-16 items-center gap-4 px-6">
    <Button
      variant="ghost"
      size="icon"
      onClick={() => navigate(-1)}
      className="h-8 w-8"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
    <SidebarTrigger />
    <h1>Tool Name</h1>
  </div>
</header>
```

#### 2. Fix Card Header (lines ~105-120)
```tsx
// OLD:
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>

// NEW:
<Card className="animate-fade-in">
  <CardHeader>
    <div className="flex items-center justify-between">
      <div>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </div>
      <FavoriteButton toolId="tool-id" toolName="Tool Name" />
    </div>
  </CardHeader>
```

#### 3. Add Tool Introduction Card (after main Card)
```tsx
<Card className="mt-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-blue-200">
  <CardContent className="pt-6">
    <p className="text-gray-700 leading-relaxed">
      <strong className="text-gray-900">
        What is [Tool Name]?
      </strong>{" "}
      [Description of what the tool does and why it's useful] 🚀
    </p>
  </CardContent>
</Card>
```

#### 4. Expand Common Use Cases Card (replace existing minimal one)
```tsx
<Card className="mt-6">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Zap className="h-5 w-5 text-primary" />
      Common Use Cases
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* 4 use case boxes with icons */}
      <div className="flex gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200">
        <div className="p-2 bg-white rounded-lg h-fit">
          <Icon1 className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <div className="font-semibold text-blue-900">Use Case 1</div>
          <p className="text-sm text-blue-700">
            Description
          </p>
        </div>
      </div>
      {/* Repeat for 3 more use cases with different colors */}
    </div>
  </CardContent>
</Card>
```

#### 5. Expand Pro Tips Card (4 tips instead of 2)
```tsx
<Card className="mt-6 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 border-amber-200">
  <CardHeader>
    <CardTitle className="flex items-center gap-2 text-amber-900">
      <Info className="h-5 w-5 text-amber-600" />
      💡 Pro Tips
    </CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="flex gap-2 items-start">
        <div className="text-amber-600 font-bold">→</div>
        <p className="text-sm text-amber-900">
          <strong>Tip 1:</strong> Description
        </p>
      </div>
      {/* Add 3 more tips */}
    </div>
  </CardContent>
</Card>
```

#### 6. Add Related Tools Card
```tsx
<Card className="mt-6">
  <CardHeader>
    <CardTitle>🔗 Related Tools You Might Like</CardTitle>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      <button
        onClick={() => navigate("/tools/related-tool-1")}
        className="p-4 text-left rounded-lg border-2 border-gray-200 hover:border-primary hover:bg-primary/5 transition-all group"
      >
        <div className="font-semibold text-gray-900 group-hover:text-primary">
          Related Tool 1
        </div>
        <div className="text-sm text-gray-600 mt-1">
          Description
        </div>
      </button>
      {/* Add 2 more related tools */}
    </div>
  </CardContent>
</Card>
```

## 🎯 Next Steps

I will now proceed to complete all remaining 8 tools using this structure.

### Time Estimate
- Creating 2 files (JsonToCsv, XmlToJson): ~10 minutes
- Updating 6 files: ~15 minutes
- **Total**: ~25 minutes

Proceeding now...
