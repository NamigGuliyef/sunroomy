"use client";
import { PageWrapper } from "@/components/PageWrapper";
import Preloader from "@/components/admin/Preloader";
import RequestsTable from "@/components/admin/requestsTable";
import { IRequest } from "@/types/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
export default function RequestsPage() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState<IRequest[] | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            "/admin/dashboard/request-project",
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    if (session?.user.token) {
      fetchRequests();
      setLoading(false);
    }
  }, [session?.user.token]);

  return (
    <>
      {loading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
            <h1 className="text-5xl mb-4">Requests data</h1>
            <RequestsTable requests={requests!} />
          </div>
        </PageWrapper>
      )}
    </>
  );
}
