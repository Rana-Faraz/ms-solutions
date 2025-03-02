import { getBlogPostById } from "@/app/(admin)/admin/blogs/_actions/blog-actions";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog Post Preview";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export async function GET({
  params,
}: {
  params: Promise<{ blogSlug: string }>;
}) {
  const { blogSlug } = await params;
  const blog = await getBlogPostById(blogSlug);
  if (blog.error || !blog.post) {
    return new Response("Blog not found", { status: 404 });
  }

  // Extract data from blog post
  const { title, readTime } = blog.post;
  const authorName = blog.post.author?.name || "Anonymous";
  const categories =
    blog.post.categories?.map((cat) => cat.name).join(", ") || "";

  // Font loading
  const interBold = fetch(
    new URL(
      "https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap",
    ),
  ).then((res) => res.arrayBuffer());

  const interRegular = fetch(
    new URL(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400&display=swap",
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#f8fafc",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #e2e8f0 2%, transparent 0%), radial-gradient(circle at 75px 75px, #e2e8f0 2%, transparent 0%)",
          backgroundSize: "100px 100px",
          padding: "60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative element */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            right: "-100px",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
            opacity: 0.2,
          }}
        />

        {/* Category tag */}
        {categories && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 16px",
              borderRadius: "20px",
              fontSize: 18,
              marginBottom: "20px",
            }}
          >
            {categories}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: "bold",
            color: "#1e293b",
            lineHeight: 1.2,
            marginBottom: "20px",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>

        {/* Author and read time */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#3b82f6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 20,
              marginRight: "12px",
            }}
          >
            {authorName.charAt(0)}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: "#334155",
              }}
            >
              {authorName}
            </div>
            {readTime && (
              <div
                style={{
                  fontSize: 16,
                  color: "#64748b",
                }}
              >
                {readTime} min read
              </div>
            )}
          </div>
        </div>

        {/* Site branding */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            right: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1e293b",
            }}
          >
            Your Blog
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: await interRegular,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
