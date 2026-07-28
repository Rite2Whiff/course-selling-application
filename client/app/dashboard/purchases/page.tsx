"use client";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/components/loading";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Courses() {
  const { user } = useAuth();
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl self-center">Courses</h2>
      <div className="grid grid-cols-3 gap-3">
        {user && user.purchases.length > 0 ? (
          user.purchases.map((purchase) => {
            const { course } = purchase;
            return (
              <Card key={course.id}>
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl">$ {course.price}</p>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
