import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/hYCuJzM7MA50NHSqrYkAThCcRYZ4vtuzNSEd8K5fpxUJlIM0",
  "https://utfs.io/f/hYCuJzM7MA50Vo2pEVnCkvqGjDZR30Ti5WzybVY8r2nlSM6p",
  "https://utfs.io/f/hYCuJzM7MA50wNcndHmBMtJSRTkNjbqFg19lKdDezwX7uG35",
  "https://utfs.io/f/hYCuJzM7MA50jVqxizEPzB8yeTLpMfiObFQDWkag6Rv3GKZt",
  "https://utfs.io/f/hYCuJzM7MA50yJLmGBdNoCtHek5dpAVarYzmSXwOIhLnZ8yi",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
  title: "title",
  description: "description",
}));

export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
      Hello gallery in progress
    </main>
  );
}
