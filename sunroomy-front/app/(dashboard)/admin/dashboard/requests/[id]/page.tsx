"use client";
import { PageWrapper } from "@/components/PageWrapper";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/admin/ui/card";
import { IRequest } from "@/types/types";
import { useSession } from "next-auth/react";
import axios from "axios";
import Preloader from "@/components/admin/Preloader";
import { Button } from "@nextui-org/react";
import moment from "moment";
const RequestSingle = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState(true);
  const [requestData, setRequestData] = useState<IRequest | null>(null);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL +
            `/admin/dashboard/request-project/${params.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.user.token}`,
            },
          }
        );
        setRequestData(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    };
    if (session?.user.token) {
      fetchRequests();
      setLoading(false);
    }
  }, [session?.user.token, params.id]);
  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank");
  };
  const formatDate = (date: string) => {
    return moment(requestData?.createdAt).format('DD MMM,YYYY HH:MM');
  };
  return (
    <>
      {loading ? (
        <div className="h-screen">
          <Preloader />
        </div>
      ) : (
        <PageWrapper>
          <div className="container mt-6 mx-auto px-6 max-w-[1280px]">
            <h1 className="text-5xl mb-4">Request data</h1>
            <Card>
              <CardHeader>
                <div className="font-bold text-xl">
                  {requestData?.first_name} {requestData?.last_name}
                </div>
                <div className="text-gray-600">{requestData?.email}</div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <strong>Phone Number:</strong> {requestData?.phone_number}
                  </div>
                  <div>
                    <strong>Location:</strong>{" "}
                    {`${requestData?.city}, ${requestData?.state}, ${requestData?.country}`}
                  </div>
                  <div>
                    <strong>ZIP Code:</strong> {requestData?.zipcode}
                  </div>
                  <div>
                    <strong>Main Structure Model:</strong>{" "}
                    {requestData?.main_structure_model}
                  </div>
                  <div>
                    <strong>Dimensions:</strong>{" "}
                    {`${requestData?.width_in_feet}ft x ${requestData?.projection_in_feet}ft x ${requestData?.height_in_feet}ft`}
                  </div>
                  <div>
                    <strong>Structure Situation:</strong>{" "}
                    {requestData?.structure_situation}
                  </div>
                  <div>
                    <strong>Structure Color:</strong>{" "}
                    {requestData?.structure_color}
                  </div>
                  <div>
                    <strong>Windows and Doors:</strong>{" "}
                    {requestData?.window_and_doors.join(", ")}
                  </div>
                  <div>
                    <strong>Sunscreens:</strong>{" "}
                    {requestData?.sunscreens.join(", ")}
                  </div>
                </div>
                <div className="mt-4">
                  <strong>Files:</strong>{" "}
                  {requestData?.files.map((file, index) => (
                    <div className="flex items-center gap-8" key={index}>
                      <h1>File {index + 1} </h1>
                      <Button
                        variant="bordered"
                        onClick={() => handleDownload(file)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <strong>Project Details:</strong>{" "}
                  {requestData?.project_details}
                </div>
                <div className="mt-4">
                  <strong>About Us:</strong> {requestData?.about_us}
                </div>
                <div className="mt-4">
                  <strong>Created At:</strong>{" "}
                  {formatDate(requestData?.createdAt!)}
                </div>
              </CardContent>
            </Card>
          </div>
        </PageWrapper>
      )}
    </>
  );
};

export default RequestSingle;
