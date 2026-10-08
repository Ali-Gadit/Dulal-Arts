export default {
  name: "galleryProject",
  title: "Gallery Project",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string" },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" } },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Gifts", value: "gifts" },
          { title: "Birthdays", value: "birthdays" },
          { title: "Decor", value: "decor" },
          { title: "Hampers", value: "hampers" },
          { title: "Events", value: "events" },
          { title: "Custom", value: "custom" },
        ],
      },
    },
    {
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    },
    {
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", fields: [{ name: "alt", title: "Alt text", type: "string" }] }],
    },
    { name: "description", title: "Description", type: "text" },
    { name: "occasion", title: "Occasion", type: "string" },
    { name: "featured", title: "Featured", type: "boolean", initialValue: false },
    { name: "price", title: "Price", type: "string" },
    { name: "showPrice", title: "Show Price", type: "boolean", hidden: true },
    { name: "order", title: "Order", type: "number" },
  ],
};

