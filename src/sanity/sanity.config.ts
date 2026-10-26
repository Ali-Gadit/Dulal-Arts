import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  name: "default",
  title: "Dulal Arts Studio",

  projectId: "g0s5axaa",
  dataset: "production",

  // This defines the base path where the studio is mounted in your router
  basePath: "/admin",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Home Page Settings")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("Services")
              .child(
                S.list()
                  .title("Service Categories")
                  .items([
                    S.listItem()
                      .title("DIY kits")
                      .child(
                        S.documentList()
                          .title("DIY kits")
                          .filter('_type == "service" && category == "DIY kits"'),
                      ),
                    S.listItem()
                      .title("Pretty Little Decor")
                      .child(
                        S.documentList()
                          .title("Pretty Little Decor")
                          .filter('_type == "service" && category == "Pretty Little Decor"'),
                      ),
                    S.listItem()
                      .title("Gifts")
                      .child(
                        S.documentList()
                          .title("Gifts")
                          .filter('_type == "service" && category == "Gifts"'),
                      ),
                    S.listItem()
                      .title("Wrapping & Packaging")
                      .child(
                        S.documentList()
                          .title("Wrapping & Packaging")
                          .filter(
                            '_type == "service" && category == "Wrapping & Packaging Services"',
                          ),
                      ),
                    S.listItem()
                      .title("Arts")
                      .child(
                        S.documentList()
                          .title("Arts")
                          .filter('_type == "service" && category == "Arts"'),
                      ),
                    S.listItem()
                      .title("motiyan by DulalArts")
                      .child(
                        S.documentList()
                          .title("motiyan by DulalArts")
                          .filter(
                            '_type == "service" && category == "motiyan by DulalArts"',
                          ),
                      ),
                    S.listItem()
                      .title("Return Gifts & Favours")
                      .child(
                        S.documentList()
                          .title("Return Gifts & Favours")
                          .filter(
                            '_type == "service" && (category == "Return Gifts & Favours" || category == "Return Gifs & Favours")',
                          ),
                      ),
                    S.listItem()
                      .title("All Services")
                      .child(S.documentList().title("All Services").filter('_type == "service"')),
                  ]),
              ),
            S.documentTypeListItem("galleryProject").title("Gallery"),
            S.documentTypeListItem("testimonial").title("Customer Feedback"),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
  },
});
