import React from 'react';
import Footer from '../footer/Footer';
import Blog_main from '../images/BG1.jpg'; 
import bg from '../images/one_book.jpg';
import customer from '../images/customer_review.jpg';
import young from '../images/young-woman.jpg';
import cropped from '../images/cropped.jpg';
import man from '../images/man-reading.jpg';
import books from '../images/books.jpg';
import Header from '../NavBar/Header';

export default function Blog() {
  const blogPosts = [
    {
      id: "1",
      title: "How to Get Started on Bookstagram in 2022",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: customer,
      slug: "how-to-get-started-on-bookstagram-2022",
    },
    {
      id: "2",
      title: "The 61 Greatest Indie Books of All Time",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: young,
      slug: "61-greatest-indie-books-all-time",
    },
    {
      id: "3",
      title: "Books you won't be able to put down on World Book Day",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: cropped,
      slug: "books-you-wont-put-down-world-book-day",
    },
    {
      id: "4",
      title: "How to Get Started on Bookstagram in 2022",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: man,
      slug: "how-to-get-started-on-bookstagram-2022",
    },
    {
      id: "5",
      title: "The 61 Greatest Indie Books of All Time",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: books,
      slug: "61-greatest-indie-books-all-time",
    },
    {
      id: "6",
      title: "Books you won't be able to put down on World Book Day",
      date: "May 10, 2024",
      excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur",
      image: bg,
      slug: "books-you-wont-put-down-world-book-day",
    }
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        <Header />

        {/* Blog Hero Section */}
        <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
          style={{
            backgroundImage: `url(${Blog_main})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px'
          }}
        >
          <div className="container mx-auto px-4 text-center">
            <h4 className="mb-4">
              <span className='text-dark'>
                Home <span className="mx-3">📚</span>Blog
              </span>
            </h4>
            <h2 className="text-4xl font-bold">
              Blog
            </h2>
          </div>
        </section>

        {/* Blog Post Cards */}
        <div className="container py-5">
          <div className="row justify-content-center">
            {blogPosts.map((post) => (
              <div key={post.id} className="col-md-6 col-lg-4 mb-4 d-flex justify-content-center">
                <div className="card shadow-lg p-3 rounded-lg" data-aos="zoom-in-down" style={{ height: '500px', width: '450px' }}>
                  <img
                    src={post.image}
                    className="card-img-top rounded-lg"
                    alt={post.title}
                    style={{ height: '240px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-2xl text-dark fw-bold">{post.title}</h5>
                    <p className="card-text text-danger  ">{post.date} • No Comments</p>
                    <p className="card-text text-truncate">{post.excerpt}</p>
                  </div>

                  <div className="card-footer bg-light">
                    <span className="text-dark fw-bold text-decoration-none">
                      Continue Reading »
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <Footer />
      </div>
    </>
  );
}

