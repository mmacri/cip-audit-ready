import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 md:py-32">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-8xl font-bold text-primary/20 mb-4">404</div>
          <h1 className="text-3xl font-bold text-navy mb-4">Page Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The page you are looking for does not exist or has been moved. 
            Let us help you get back on track with your compliance journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/nerc-cip-101">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Start Learning
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
