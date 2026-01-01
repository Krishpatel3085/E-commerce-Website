import React from "react";
import Button from 'react-bootstrap/Button';
import Footer from "../footer/Footer";
import { Accordion } from 'react-bootstrap';
import { Clock, MapPin } from "lucide-react";
import event from '../images/main_home.jpg';
import young from '../images/young-student.jpg';
import getting from '../images/getting-knowledge.jpg';
import women from '../images/young-woman_1.jpg';
import hand from '../images/hand-holding.jpg';
import group from '../images/group-of-college.jpg';
import collage from '../images/woman-reading.jpg';
import Header from "../NavBar/Header";

function Event() {
  // Event section
  const events = [
    {
      id: 1,
      title: "Festival of Books",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "JCC, Jakarta",
      date: "May 14, 2024",
      image: young,
    },
    {
      id: 2,
      title: "Guide presents a reading corner",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "Istora GBK, Jakarta",
      date: "May 21, 2024",
      image: getting,
    },
    {
      id: 3,
      title: "Read free books in Jakarta",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "JCC, Jakarta",
      date: "May 28, 2024",
      image: women,
    },
    {
      id: 4,
      title: "Promotion Book",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "ICE BSD, Tangerang",
      date: "June 4, 2024",
      image: hand,
    },
    {
      id: 5,
      title: "New Friends with Books",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "JCC, Jakarta",
      date: "May 14, 2024",
      image: group,
    },
    {
      id: 6,
      title: "Book Signing",
      description: "Lorem ipsum dolor sit amet consectetur adipiscing elit dolor",
      location: "Istora GBK, Jakarta",
      date: "May 21, 2024",
      image: collage,
    },
  ];

  // FAQ section
  const faqs = [
    {
      question: "Where Can I Find Information?",
      answer: "Imperdiet velit taciti at viverra rhoncus facilisis diam. Hac gravida eget natoque rutrum sapien dis pretium libero. Ut est lectus mus nisi fermentum montes dapibus eu. Auctor fusce cubilia justo a lacinia.",
    },
    {
      question: "What Are Your Terms And Conditions?",
      answer: "Imperdiet velit taciti at viverra rhoncus facilisis diam. Hac gravida eget natoque rutrum sapien dis pretium libero. Ut est lectus mus nisi fermentum montes dapibus eu. Auctor fusce cubilia justo a lacinia.",
    },
    {
      question: "Can I Buy Directly From The Factory?",
      answer: "Imperdiet velit taciti at viverra rhoncus facilisis diam. Hac gravida eget natoque rutrum sapien dis pretium libero. Ut est lectus mus nisi fermentum montes dapibus eu. Auctor fusce cubilia justo a lacinia.",
    },
    {
      question: "What Kinds of Payment Do You Accept?",
      answer: "Imperdiet velit taciti at viverra rhoncus facilisis diam. Hac gravida eget natoque rutrum sapien dis pretium libero. Ut est lectus mus nisi fermentum montes dapibus eu. Auctor fusce cubilia justo a lacinia.",
    },
    {
      question: "When do I receive my order?",
      answer: "Imperdiet velit taciti at viverra rhoncus facilisis diam. Hac gravida eget natoque rutrum sapien dis pretium libero. Ut est lectus mus nisi fermentum montes dapibus eu. Auctor fusce cubilia justo a lacinia.",
    },
  ];

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <section className="bg-gray-900 text-white py-20 flex items-center justify-center"
          style={{
            backgroundImage: `url(${event})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '400px'
          }} >

          <div className="container mx-auto px-4 text-center">
            <h4 className="mb-4">
              <span className='text-dark text-2xl'>
                Home <span className="mx-3">📚</span>Event
              </span>
            </h4>
            <h2 className="text-4xl font-bold">
              Event
            </h2>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h6 className="text-red-500 uppercase mb-2">Event</h6>
              <h2 className="text-3xl font-bold mb-4">Book promotions</h2>
              <p className="max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
                ullamcorper mattis, pulvinar dapibus leo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event) => (
                <div key={event.id} className="flex flex-col md:flex-row gap-4 bg-white rounded-lg shadow-md overflow-hidden" data-aos="zoom-in-right">
                  <div className="md:w-1/2 relative group">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button className="bg-red-600 text-white px-4 py-2 rounded-lg border-0 transition-colors cursor-pointer">
                        View More
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                    <div className="flex items-center mb-2">
                      <MapPin className="mr-2 text-gray-500" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 text-gray-500" />
                      <span>{event.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <h6 className="text-red-600 uppercase mb-2" data-aos="fade-down">Most popular questions</h6>
                <h2 className="text-3xl font-bold mb-4" data-aos="fade-down">
                  Frequently asked questions
                </h2>
                <p className="text-gray-600" data-aos="fade-right">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, <br /> luctus nec ullamcorper mattis, pulvinar
                  dapibus leo.
                </p>
              </div>
              <div className="md:w-1/2">
                <Accordion defaultActiveKey="0" className="w-full">
                  {faqs.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()} data-aos="flip-left">
                      <Accordion.Header>{faq.question}</Accordion.Header>
                      <Accordion.Body>{faq.answer}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}

export default Event;
