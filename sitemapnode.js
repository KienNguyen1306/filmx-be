const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs'); // Import thư viện fs để làm việc với file
// Tạo danh sách URL cho sitemap
const urls = [
  { url: '/', changefreq: 'weekly', priority: 1 },
  { url: "/search", changefreq: 'monthly', priority: 0.8 },
  { url: "/watch/:movieID", changefreq: 'monthly', priority: 0.8 },
  // Thêm các URL khác của trang web của bạn vào đây
];

// Tạo sitemap
const stream = new SitemapStream({ hostname: 'https://filmsexhd.com' });

// Thêm các URL vào sitemap
urls.forEach((url) => {
  stream.write(url);
});

stream.end();

// Chuyển sitemap thành chuỗi XML
streamToPromise(stream).then((data) => {
  const sitemap = data.toString();
  fs.writeFileSync('sitemap.xml', sitemap);
  console.log(sitemap);
});

