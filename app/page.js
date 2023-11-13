"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

export default function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    const response = await fetch("/api/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    // console.log(result);
    setData(
      result.sort((a, b) => new Date(b.updatedAt) > new Date(a.updatedAt))
    );
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchDelete = async (id) => {
    setIsLoading(true);
    const response = await fetch("/api/new", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const result = await response.json();

    await fetchData();

    setIsLoading(false);
  };

  const fetchClone = async (data) => {
    console.log(data);
    setIsLoading(true);
    delete data._id;
    data.topic = data.topic + "_copy";
    console.log(data);
    const response = await fetch("/api/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data,
      }),
    });

    const result = await response.json();
    console.log(result);
    await fetchData();
    // push("/");
  };
  return (
    <main className="space-y-6">
      {isLoading ? (
        <div className="relative top-[300px] left-[40%]">
          <Button disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait
          </Button>
        </div>
      ) : (
        <>
          <div className="flex-col">
            <h1 className="font-bold text-[40px]">Dashboard</h1>
            <h6 className="text-slate-400">
              Right click the logo to displays a actions{" "}
            </h6>
          </div>
          <div className="grid  grid-cols-4">
            {data?.map((d, i) => (
              <ContextMenu key={i}>
                <ContextMenuTrigger>
                  <div className="w-[220px] h-[220px] hover:bg-slate-100 relative bg-slate-50 rounded-lg">
                    <Link href={`/${d._id}`}>
                      <div className="w-full h-full  flex justify-center items-center">
                        <Image
                          src={d.image}
                          width={200}
                          height={200}
                          alt="image"
                          className="w-[200px] h-[200px]  content-center "
                        />
                      </div>
                    </Link>

                    <h1 className="flex justify-center mt-1 font-bold">
                      {d.topic}
                    </h1>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>
                    <Link href={`/${d._id}`} target="_blank">
                      Open in new tab
                    </Link>
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="text-purple-500"
                    onClick={() => fetchClone(d)}
                  >
                    Clone
                  </ContextMenuItem>
                  <ContextMenuItem
                    className="text-red-500"
                    onClick={() => fetchDelete(d._id)}
                  >
                    Delete
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
