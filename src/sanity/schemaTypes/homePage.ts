export default {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "storyImage",
      title: "Our Story Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "featuredProjectImage",
      title: "Featured Project Image (Optional override)",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "instagramFeed",
      title: "Instagram Feed Images",
      type: "array",
      of: [{ type: "image" }],
    },
  ],
};
