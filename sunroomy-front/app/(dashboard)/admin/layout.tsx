import FooterAdmin from "@/components/admin/ui/Footer";
import Header from "@/components/admin/ui/Navbar";
import { getServerSession } from "next-auth";
import { Providers } from "../../providers";
import { Metadata } from "next";
export const metadata: Metadata = {
  robots: {
    index: false,
  },
};
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <Providers>
      <Header user={session?.user} />
      <div className="font-helvetica">{children}</div>
      {/* <hr className="mt-16" />
      <FooterAdmin /> */}
    </Providers>
  );
}
