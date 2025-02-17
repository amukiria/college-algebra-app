"use client";
import React, { useState, useEffect } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress"; // Make sure the Progress component is imported correctly
import Link from "next/link";
import { UserIcon, BookOpenIcon, StarIcon } from "lucide-react";

export default function Dashboard() {
  const [progress, setProgress] = useState(0); // Initial progress value

  // Simulate progress update (this can come from API, user action, etc.)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 100) return prevProgress + 1;
        clearInterval(interval); // Stop when progress reaches 100%
        return prevProgress;
      });
    }, 100); // Update progress every 100ms
    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  return (
    <>
      <SignedIn>
        <div className="p-8 bg-background min-h-screen text-text">
          <h1 className="text-4xl font-bold text-primary font-heading mb-8">
            Dashboard
          </h1>
          
          {/* User Progress */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-primary font-heading mb-4">
              Your Progress
            </h2>
            <Card className="p-6 shadow-lg rounded-lg bg-white">
              <CardContent>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-medium font-body text-text">Overall Completion</p>
                  <span className="text-lg font-bold text-primary">{progress}%</span>
                </div>
                {/* Removed max={100} from Progress */}
                <Progress value={progress} className="mt-4" />
              </CardContent>
            </Card>
          </div>

          {/* Quick Access */}
          <h2 className="text-2xl font-semibold text-primary font-heading mb-4">
            Quick Access
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-lg rounded-lg flex flex-col items-center bg-white">
              <BookOpenIcon className="h-10 w-10 text-primary mb-2" />
              <p className="text-lg font-medium font-body text-text">Lessons</p>
              <Button className="mt-4 w-full bg-accent text-white hover:bg-[#0056b3]">
                <Link href="/">View Lessons</Link>
              </Button>
            </Card>
            <Card className="p-6 shadow-lg rounded-lg flex flex-col items-center bg-white">
              <StarIcon className="h-10 w-10 text-primary mb-2" />
              <p className="text-lg font-medium font-body text-text">Achievements</p>
              <Button className="mt-4 w-full bg-accent text-white hover:bg-[#0056b3]">
                <Link href="/achievements">View Achievements</Link>
              </Button>
            </Card>
            <Card className="p-6 shadow-lg rounded-lg flex flex-col items-center bg-white">
              <UserIcon className="h-10 w-10 text-primary mb-2" />
              <p className="text-lg font-medium font-body text-text">Profile</p>
              <Button className="mt-4 w-full bg-accent text-white hover:bg-[#0056b3]">
                <Link href="/profile">View Profile</Link>
              </Button>
            </Card>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
