import { client } from "../src/lib/sanity";

async function test() {
  console.log("Services:", await client.fetch(`*[_type == "service"]`));
  console.log("Testimonials:", await client.fetch(`*[_type == "testimonial"]`));
  console.log("Gallery:", await client.fetch(`*[_type == "galleryProject"]`));
}
test();
