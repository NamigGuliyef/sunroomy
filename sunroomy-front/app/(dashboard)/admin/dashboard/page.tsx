
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { PageWrapper } from "@/components/PageWrapper";
import DashboardItemCard from "@/components/admin/DashboardItemCard";
import { Divider } from "@nextui-org/react";
import axios from "axios";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export const revalidate = 1;
const fetchDataFromUrl = async (url: string, token: string) => {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data from URL:", error);
    throw error;
  }
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("../auth/signin");
  const endpoints = [
    "/admin/dashboard/products",
    "/admin/dashboard/projects",
    "/admin/dashboard/request-project",
    "/admin/dashboard/subproducts",
    "/admin/dashboard/features",
    "/admin/dashboard/subscribers",
  ];

  const data = await Promise.all(
    endpoints.map((endpoint) =>
      fetchDataFromUrl(endpoint, session?.user.token!),
    ),
  );

  const [products, projects, requests, subproducts, features, subscribers] =
    data;
  return (
    <PageWrapper>
      <div className="container mx-auto mt-6 max-w-[1280px] px-6">
        <h1 className="mb-5 text-3xl">Dashboard</h1>
        <Divider className="my-5" />
        <h2 className="my-5 text-2xl font-semibold">Home Page</h2>
        <div className="grid grid-cols-3 gap-8">
          <DashboardItemCard
            component
            title="Home Page About"
            href="/admin/dashboard/home-about/"
          />
          <DashboardItemCard
            component
            title="Hero"
            href="/admin/dashboard/hero/"
          />
          <DashboardItemCard
            component
            title="Why Sunroomy"
            href="/admin/dashboard/about/"
          />
          <DashboardItemCard
            component
            title="Insipire"
            href="/admin/dashboard/inspire/"
          />
          <DashboardItemCard
            component
            title="Footer Follow Us links"
            href="/admin/dashboard/follow-us/"
          />
        </div>
        <Divider className="my-5" />
        <h2 className="my-5 text-2xl font-semibold">
          Products & Projects Related Pages
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <DashboardItemCard
            title="Projects"
            count={projects.length}
            href="/admin/dashboard/projects/"
          />
          <DashboardItemCard
            title="Products"
            count={products.length}
            href="/admin/dashboard/products/"
          />
          <DashboardItemCard
            title="Subproducts"
            count={subproducts.length}
            href="/admin/dashboard/subproducts/"
          />
        </div>
        <Divider className="my-5" />
        <h2 className="my-5 text-2xl font-semibold">Info Pages</h2>
        <div className="mb-8 grid grid-cols-3 gap-8">
          <DashboardItemCard
            title="About Us Page"
            href="/admin/dashboard/about-us/"
          />
          <DashboardItemCard
            title="Tailored Design Page"
            href="/admin/dashboard/design/"
          />
          <DashboardItemCard
            title="Requests"
            count={requests.length}
            href="/admin/dashboard/requests/"
          />
          <DashboardItemCard
            title="Subscribers"
            count={subscribers.length}
            href="/admin/dashboard/subscribers/"
          />
          <DashboardItemCard
            title="Contacts Page"
            href="/admin/dashboard/contact/"
          />
          <DashboardItemCard
            title="Applications Page (disabled)"
            href="/admin/dashboard/"
          />
        </div>
      </div>
    </PageWrapper>
  );
}

// <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//   {/* Products */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Products</CardTitle>
//       <CardDescription>Total count of products</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {products.length}
//         </p>
//         <Link href={"/admin/dashboard/products"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Projects */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Projects</CardTitle>
//       <CardDescription>Total count of projects</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {projects.length}
//         </p>
//         <Link href={"/admin/dashboard/projects"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Requests */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Requests</CardTitle>
//       <CardDescription>Total count of requests</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {requests.length}
//         </p>
//         <Link href={"/admin/dashboard/requests"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Features */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Features</CardTitle>
//       <CardDescription>Total count of features</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {features.length}
//         </p>
//         <Link href={"/admin/dashboard/features"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Subproducts */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Subproducts</CardTitle>
//       <CardDescription>Total count of subproducts</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {subproducts.length}
//         </p>
//         <Link href={"/admin/dashboard/subproducts"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Subscriptions */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Subscriptions</CardTitle>
//       <CardDescription>Total count of subscriptions</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <p className="text-right text-3xl font-bold">
//           {subscribers?.length}
//         </p>
//         <Link href={"/admin/dashboard/subscribers"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Applications */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Applications</CardTitle>
//       <CardDescription>Click here to edit applications</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-end">
//         <Link href={"/admin/dashboard/applications"}>
//           <Button
//             size="md"
//             className="ml-auto flex items-center text-xl"
//             color="secondary"
//             disabled
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Tailored Design */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Tailored Design</CardTitle>
//       <CardDescription>
//         Click here to edit Tailored Design page
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <Link className="ml-auto" href={"/admin/dashboard/design"}>
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Specifications */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Specifications</CardTitle>
//       <CardDescription>
//         Click here to edit specifications
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <Link
//           className="ml-auto"
//           href={"/admin/dashboard/specifications"}
//         >
//           <Button
//             size="md"
//             className="flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Inspire */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Inspire</CardTitle>
//       <CardDescription>
//         Click here to edit Inspire(mainPage)
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-between">
//         <Link href={"/admin/dashboard/inspire"}>
//           <Button
//             size="md"
//             className="ml-auto flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* Contacts */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">Contacts</CardTitle>
//       <CardDescription>Click here to edit contact page</CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-end">
//         <Link href={"/admin/dashboard/contact"}>
//           <Button
//             size="md"
//             className="ml-auto flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
//   {/* About Us */}
//   <Card>
//     <CardHeader>
//       <CardTitle className="text-3xl">About Us</CardTitle>
//       <CardDescription>
//         Click here to edit about us page
//       </CardDescription>
//     </CardHeader>
//     <CardContent>
//       <div className="flex justify-end">
//         <Link href={"/admin/dashboard/about-us"}>
//           <Button
//             size="md"
//             className="ml-auto flex items-center text-xl"
//             color="default"
//             variant="faded"
//           >
//             visit
//             <ArrowRight
//               className="text-inherit"
//               strokeWidth={"2px"}
//               size={"20px"}
//             />
//           </Button>
//         </Link>
//       </div>
//     </CardContent>
//   </Card>
// </div>
