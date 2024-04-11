import { IProduct, IProject, ISubProduct } from "@/types/types";

async function getProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
    next: { revalidate: 1 },
  });
  return res.json();
}
async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products`, {
    next: { revalidate: 1 },
  });
  return res.json();
}
async function getSubproducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/subproducts`,
    {
      next: { revalidate: 1 },
    },
  );
  return res.json();
}
export default async function sitemap() {
  const baseUrl = "https://sunroomy.com";
  const projects = await getProjects();
  const projectsUrls = projects.map((project: IProject) => {
    return {
      url: `${baseUrl}/projects/${project.slug.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
    };
  });
  const products = await getProducts();
  const productsUrls = products.map((product: IProduct) => {
    return {
      url: `${baseUrl}/products/${product.slug.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
    };
  });
  const subproducts = await getSubproducts();
  const subproductsUrls = subproducts.map((subproduct: ISubProduct) => {
    return {
      url: `${baseUrl}/products/subproducts/${subproduct.slug.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: "hourly",
    };
  });
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/request-a-quote`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/design`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...projectsUrls,
    ...productsUrls,
    ...subproductsUrls,
  ];
}
