import './library.css';
import { Card, CardHeader, Image, Divider } from "@nextui-org/react";

function Library() {
  return (
    <div className="p-2">
      <h2 className="text-xl font-semibold mb-2">Library</h2>
      <p className="text-gray-600 mb-4">Search and browse books here.</p>

      {/* Category Content Section */}
      <h3 className="text-lg font-semibold mb-3">Categories</h3>
      <div className="category-content grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {["Adventure", "Horror", "Comedy", "Drama"].map((genre, index) => (
          <Card key={index} className="w-full h-[180px] relative">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-xs text-white/60 uppercase font-bold">What to watch</p>
              <h4 className="text-white font-medium text-sm">{genre}</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt={`${genre} genre`}
              className="z-0 w-full h-full object-cover"
              src="prof2.jpg" // Replace with actual image URLs
            />
          </Card>
        ))}
      </div>

      {/* Recommendations Section */}
      <h3 className="text-lg font-semibold mb-3">Recommendations</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => ( // Change to 8 for a 4x2 grid
          <Card key={index} className="w-full p-8 flex flex-row items-center">
            <div className="flex justify-center">
              <Image
                src="prof2.jpg" // Replace with actual image URLs
                alt="Book cover"
                className="rounded-lg object-cover"
                width={120} // Adjust width as needed
                height={120} // Adjust height as needed
              />
            </div>
            <div className="text-center space-y-1 mt-2 ml-[40px]">
              <h3 className="text-sm font-semibold text-gray-900 mb-2">Marahet si Sischan as pangit pa</h3>
              <p className="text-xs text-gray-600">Christian ni Cantor</p>
              <div className="flex h-5 items-center space-x-4 text-small">
                <div>adventure</div>
                <Divider orientation="vertical" />
                <div>Docs</div>
                <Divider orientation="vertical" />
                <div>Source</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Library;
