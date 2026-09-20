
"use client";

import { useEffect, useState } from "react";

const IMG = (name: string) => "/Images/" + name;
const VIDEO = (name: string) => "/Videos/" + name;

const phone = "+916290566875";
const displayPhone = "+91-6290566875";

const phone2 = "+919830058237";
const displayPhone2 = "+91-9830058237";
const email = "online@greenhillretreatchibbo.com";

const galleryImages = [
  "hero.jpeg",
  "property.jpeg",
  "room-1.jpeg",
  "room-2.jpg",
];

const rooms = [
  {
    name: "Cosy Hill Room",
    image: "room-1.jpeg",
    images: ["room-1.jpeg", "property.jpeg"],
    description:
      "A comfortable room designed for a peaceful stay, with warm interiors and beautiful hill views.",
    price: "₹2,800",
    occupancy: "2 Adults",
    bed: "Comfortable double bed",
    bathroom: "Private bathroom",
    amenities: [
      "High-speed unlimited Wi-Fi",
      "Private bathroom",
      "Hot water",
      "Fresh linen",
      "Towels",
      "Room service",
      "Mountain surroundings",
      "Home-style meals available",
    ],
  },
  {
    name: "Mountain Retreat",
    image: "room-2.jpg",
    images: ["room-2.jpg", "property.jpeg"],
    description:
      "Wake up to mountain air, greenery and the calm atmosphere of the homestay.",
    price: "₹3,200",
    occupancy: "2 Adults",
    bed: "Comfortable double bed",
    bathroom: "Private bathroom",
    amenities: [
      "High-speed unlimited Wi-Fi",
      "Private bathroom",
      "Hot water",
      "Fresh linen",
      "Towels",
      "Room service",
      "Mountain surroundings",
      "Home-style meals available",
    ],
  },
];
const workFromHillsPackages = [
  {
    id: "work-7",
    duration: "7 NIGHTS",
    name: "Work Escape",
    description:
      "A refreshing week in the hills for remote workers who need a change of scenery.",
    price: "₹14,999",
    rateNote: "package onwards",
    featured: false,
    inclusions: [
      "7-night stay",
      "High-speed unlimited Wi-Fi",
      "Daily breakfast",
      "Work-friendly room setup",
      "Housekeeping",
    ],
  },
  {
    id: "work-14",
    duration: "14 NIGHTS",
    name: "Hill Office",
    description:
      "Settle in for a productive two weeks surrounded by fresh air, greenery and quiet.",
    price: "₹27,999",
    rateNote: "package onwards",
    featured: true,
    inclusions: [
      "14-night stay",
      "High-speed unlimited Wi-Fi",
      "Daily breakfast",
      "Work-friendly room setup",
      "Housekeeping",
      "Special long-stay rate",
    ],
  },
  {
    id: "work-30",
    duration: "30 NIGHTS",
    name: "Work From Hills",
    description:
      "Make the mountains your office with our best-value extended stay package.",
    price: "₹49,999",
    rateNote: "package onwards",
    featured: false,
    inclusions: [
      "30-night stay",
      "High-speed unlimited Wi-Fi",
      "Daily breakfast",
      "Work-friendly room setup",
      "Regular housekeeping",
      "Best long-stay rate",
    ],
  },
];
const experiences = [
  {
    number: "01",
    title: "Kalimpong Explorer",
    icon: "✦",
    text: "Discover monasteries, viewpoints, markets and the quieter corners of Kalimpong.",
  },
  {
    number: "02",
    title: "Village & Nature Walk",
    icon: "⌁",
    text: "Take a relaxed walk through the surrounding greenery and experience local life.",
  },
  {
    number: "03",
    title: "Day Trips",
    icon: "◎",
    text: "Explore nearby hill destinations and scenic routes with a locally planned itinerary.",
  },
];

const amenities = [
  "Comfortable Rooms",
  "Home-style Food",
  "Mountain Views",
  "Hot Water",
  "Parking",
  "Peaceful Environment",
  "Local Assistance",
  "Sightseeing Assistance",
];
type BookingSelection = {
  type: "general" | "room" | "package";
  name: string;
  price?: string;
};
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<(typeof rooms)[number] | null>(
  null
);
  const [activeGallery, setActiveGallery] = useState(0);
  const [bookingSelection, setBookingSelection] =
  useState<BookingSelection | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const elements = document.querySelectorAll(".reveal");

      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.88) {
          element.classList.add("visible");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGallery((current) => (current + 1) % galleryImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    "Hello Green Hill Retreat, I would like to know more about staying at your property."
  )}`;

  const callUrl = `tel:${phone}`;
  const emailUrl = `mailto:${email}`;

  return (
    <main className="site">
      {/* NAVIGATION */}
      <header className={`navbar ${scrolled ? "navbarScrolled" : ""}`}>
        <a href="#home" className="logo brandLogo">
  <img src="/logotransparent.png" alt="Green Hill Retreat" />

  <div className="brandName">
    <strong>Green Hill 
      <br />
      Retreat
      </strong>
    <span>Chibbo</span>
  </div>
</a>

        <nav className="desktopNav">
          <a href="#about">ABOUT</a>
          <a href="#walkthrough">WALKTHROUGH</a>
          <a href="#stay">STAY</a>
          <a href="#food">FOOD</a>
          <a href="#experiences">EXPERIENCES</a>
          <a href="#gallery">GALLERY</a>
          <a href="#location">HOW TO REACH</a>
          <a href="#contact">CONTACT</a>
          <button type="button"className="navButton" 
          onClick={() => {
  if (process.env.NODE_ENV === "production") {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  setBookingSelection({
    type: "general",
    name: "Check Availability",
  });
}}
>
  BOOK YOUR STAY
</button>
        </nav>

        <button
  type="button"
  className="mobileBook"
  onClick={() => {
  if (process.env.NODE_ENV === "production") {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  setBookingSelection({
    type: "general",
    name: "Check Availability",
  });
}}
>
  BOOK
</button>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="heroImage" />

        <div className="heroOverlay" />

        <div className="heroContent reveal">
          <h1>
            A quiet escape
            <br />
            in the hills
          </h1>

          <p>
            Come for the mountains.
            <br />
            Stay for the warmth, food
            <br />
            and slower pace of life.
          </p>

          <div className="heroButtons">
            <a href="#about" className="goldButton">
              EXPLORE THE RETREAT <span>→</span>
            </a>
          </div>
        </div>
<div className="heroBookingBar">
  <div className="bookingField">
    <label htmlFor="heroCheckIn">CHECK-IN</label>

    <input
      id="heroCheckIn"
      type="date"
      aria-label="Check-in date"
    />
  </div>

  <div className="bookingDivider" />

  <div className="bookingField">
    <label htmlFor="heroCheckOut">CHECK-OUT</label>

    <input
      id="heroCheckOut"
      type="date"
      aria-label="Check-out date"
    />
  </div>

  <div className="bookingDivider" />

  <div className="bookingField guestField">
    <label htmlFor="heroGuests">GUESTS</label>

    <select id="heroGuests" defaultValue="2">
      <option value="1">1 Guest</option>
      <option value="2">2 Guests</option>
      <option value="3">3 Guests</option>
      <option value="4">4 Guests</option>
      <option value="5">5 Guests</option>
      <option value="6">6 Guests</option>
    </select>
  </div>

 <button
  type="button"
  className="heroAvailabilityButton"
  onClick={() => {
  if (process.env.NODE_ENV === "production") {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  setBookingSelection({
    type: "general",
    name: "Check Availability",
  });
}}
>
  CHECK AVAILABILITY
  <span>→</span>
</button>
</div>
        <div className="scrollIndicator">
          <span className="mouseIcon">↓</span>
          <span>SCROLL TO EXPLORE</span>
        </div>

        <div className="heroDots">
          <span className="active" />
          <span />
          <span />
        </div>
      </section>
<div className="scrollHook">
  <span>KEEP EXPLORING</span>
  <strong>See what your stay could feel like</strong>
  <span className="scrollHookArrow">↓</span>
</div>
      {/* ABOUT */}
      <section id="about" className="about sectionLight">
        <div className="leafDecoration leftLeaf">❧</div>
        <div className="leafDecoration rightLeaf">❧</div>

        <div className="container aboutGrid">
          <div className="aboutText reveal">
            <div className="eyebrow darkEyebrow">ABOUT US</div>

            <h2>
              Welcome to
              <br />
              Green Hill Retreat
            </h2>

            <p>
                Green Hill Retreat is a peaceful homestay near Kalimpong.
                Surrounded by greenery and mountain air, it is a place to slow 
                down, reconnect and enjoy the simple pleasures of the hills.
            </p>

            <p>
              Whether you are planning a quiet family holiday, a weekend
              escape or a trip to explore the surrounding hills, we would
              love to welcome you.
            </p>

            <div className="featureGrid">
              <div>
                <span>♧</span>
                <strong>Peaceful</strong>
                <small>Surroundings</small>
              </div>

              <div>
                <span>⌂</span>
                <strong>Homely</strong>
                <small>Hospitality</small>
              </div>

              <div>
                <span>≋</span>
                <strong>Fresh</strong>
                <small>Food</small>
              </div>

              <div>
                <span>⌁</span>
                <strong>Local</strong>
                <small>Experiences</small>
              </div>
            </div>

            <a href="#contact" className="textLink">
              GET IN TOUCH →
            </a>
          </div>

          <div className="aboutImages reveal">
            <div className="aboutMainImage">
              <img src={IMG("property.jpeg")} alt="Green Hill Retreat property" />
            </div>

            <div className="aboutSideImages">
              <img src={IMG("room-1.jpeg")} alt="Room at Green Hill Retreat" />
              <img src={IMG("room-2.jpg")} alt="Mountain room at Green Hill Retreat" />
            </div>
          </div>
        </div>
      </section>

      {/* WALKTHROUGH */}
      <section id="walkthrough" className="walkthroughSection">
        <div className="walkthroughDecor left" />

        <div className="container walkthroughGrid">
          <div className="walkthroughText reveal">
            <div className="eyebrow">TAKE A LOOK AROUND</div>

            <h2>
              Experience Green Hill
              <br />
              before you arrive
            </h2>

            <p>
              Take a virtual walk around the retreat and get a feel of the
              rooms, surroundings and peaceful atmosphere of the homestay.
            </p>

            <a href="#video" className="goldButton">
              WATCH WALKTHROUGH <span>▷</span>
            </a>
          </div>

          <div id="video" className="videoCard reveal">
            <video
              controls
              playsInline
              preload="metadata"
              poster={IMG("hero.jpeg")}
            >
              <source src={VIDEO("walkthrough-web.mp4")} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div className="videoGlow" />
          </div>
        </div>
      </section>

      {/* STAY + EXPERIENCES */}
      <section id="stay" className="staySection sectionLight">
        <div className="container">

  {/* ROOMS */}
  <div className="stayBlock">
    <div className="reveal stayHeading">
      <div className="eyebrow darkEyebrow">STAY WITH US</div>

      <h2>Rooms & Stay</h2>

      <p>
        Comfortable rooms surrounded by peaceful greenery and mountain air.
      </p>
    </div>

    <div className="roomsGrid">
      {rooms.map((room, index) => (
        <article className="roomCard reveal"
         key={room.name}
         onClick={() => setSelectedRoom(room)}
>
          <div className="roomImage">
            <img src={IMG(room.image)} alt={room.name} />
            <span>ROOM 0{index + 1}</span>
          </div>

          <div className="roomBody">
            <h3>{room.name}</h3>

            <p>{room.description}</p>

            <div className="roomBottom">
              <strong>{room.price}</strong>
              <span>/ night onwards</span>
            </div>

<div className="roomActions">
  <button
    type="button"
    className="roomDetailsButton"
    onClick={(event) => {
      event.stopPropagation();
      setSelectedRoom(room);
    }}
  >
    VIEW DETAILS
  </button>

  <button
    type="button"
    className="roomBookButton"
    onClick={(event) => {
      event.stopPropagation();
      setSelectedRoom(room);
    }}
  >
    BOOK NOW
  </button> 
</div>          </div>
        </article>
      ))}
    </div>
  </div>

  {/* EXPERIENCES */}
  <div id="experiences" className="experienceBlock">
    <div className="reveal experienceHeading">
      <div className="eyebrow darkEyebrow">DISCOVER THE HILLS</div>

      <h2>Experiences & Day Trips</h2>

      <p>
        Explore Kalimpong and the surrounding hills at a comfortable,
        unhurried pace.
      </p>
    </div>

    <div className="experienceGrid">
      {experiences.map((experience) => (
        <article
          className="experienceCard reveal"
          key={experience.number}
        >
          <div className="experienceIcon">{experience.icon}</div>

          <span>{experience.number}</span>

          <h3>{experience.title}</h3>

          <p>{experience.text}</p>

          <a href="#contact">ENQUIRE →</a>
        </article>
      ))}
    </div>
  </div>

  <div className="centerLink reveal">
    <a href="#contact">VIEW MORE ROOMS SOON →</a>
  </div>
</div>
      </section>
{/* WORK FROM HILLS */}
<section id="work-from-hills" className="workFromHillsSection">
  <div className="container">

    <div className="workFromHillsBanner reveal">
      <div className="workBannerContent">
        <div className="eyebrow">WORK DIFFERENTLY</div>

        <h2>
          Working from Home?
          <br />
          Work From Hills.
        </h2>

        <p>
          We have got you covered. Trade the usual desk for mountain air,
          peaceful surroundings and a comfortable stay with high-speed,
          unlimited Wi-Fi.
        </p>

        <a href="#work-packages" className="workBannerLink">
          EXPLORE WORK FROM HOMESTAY PACKAGES ↓
        </a>
      </div>

      <div className="wifiHighlight">
        <div className="wifiIcon">⌁</div>

        <div>
          <span>STAY CONNECTED</span>
          <strong>High-Speed Unlimited Wi-Fi</strong>
          <small>
            Work, meet, stream and stay connected throughout your stay.
          </small>
        </div>
      </div>
    </div>

    <div id="work-packages" className="workPackagesIntro reveal">
      <div>
        <div className="eyebrow darkEyebrow">LONG-STAY PACKAGES</div>
        <h2>Stay longer. Work slower.</h2>
      </div>

      <p>
        Choose a stay that works around your schedule. Package rates,
        inclusions and availability will be confirmed through our booking
        system.
      </p>
    </div>

    <div className="workPackagesGrid">
      {workFromHillsPackages.map((workPackage) => (
        <article
          className={
            workPackage.featured
              ? "workPackageCard featured reveal"
              : "workPackageCard reveal"
          }
          key={workPackage.id}
        >
          {workPackage.featured && (
            <span className="packageBadge">MOST POPULAR</span>
          )}

          <span className="packageDuration">
            {workPackage.duration}
          </span>

          <h3>{workPackage.name}</h3>

          <p className="packageDescription">
            {workPackage.description}
          </p>

          <div className="packageIncludes">
            {workPackage.inclusions.map((item) => (
              <div key={item}>
                <span>✓</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="packageBottom">
            <div className="packagePrice">
              <span>FROM</span>
              <strong>{workPackage.price}</strong>
              <small>{workPackage.rateNote}</small>
            </div>

            <button
  type="button"
  className="packageBookButton"
  onClick={() => {
  if (process.env.NODE_ENV === "production") {
    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  setBookingSelection({
    type: "package",
    name: workPackage.name,
    price: workPackage.price,
  });
}}
>
  BOOK NOW
</button>
          </div>
        </article>
      ))}
    </div>

    <p className="packageFootnote reveal">
      Package prices shown are introductory placeholders and may vary by room,
      dates, number of guests and selected inclusions.
    </p>

  </div>
</section>
      {/* FOOD + AMENITIES */}
      <section id="food" className="foodSection">
        <div className="foodImage" />

        <div className="foodText reveal">
          <div className="eyebrow">FOOD MADE WITH LOVE</div>

          <h2>
            Simple, fresh
            <br />
            & delicious.
          </h2>

          <p>
            Enjoy home-style meals prepared with fresh ingredients and local
            flavours.
          </p>

          <a href="#contact">ASK ABOUT OUR MENU →</a>
        </div>

        <div className="amenities reveal">
          <div className="eyebrow">THE RETREAT</div>

          <h2>
            Everything you need
            <br />
            for a comfortable stay.
          </h2>

          <div className="amenityGrid">
            {amenities.map((amenity, index) => (
              <div className="amenity" key={amenity}>
                <span>
                  {["⌂", "≋", "⌁", "♨", "P", "♧", "☎", "◎"][index]}
                </span>
                <small>{amenity}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="gallerySection sectionLight">
        <div className="container galleryLayout">
          <div className="galleryIntro reveal">
            <div className="eyebrow darkEyebrow">MOMENTS AT GREEN HILL</div>

            <h2>Gallery</h2>

            <p>
              A glimpse of the retreat, the rooms, the mountains and the
              peaceful surroundings.
            </p>

            <a href="#galleryImages" className="goldButton darkGold">
              VIEW MORE →
            </a>
          </div>

          <div id="galleryImages" className="gallerySlider reveal">
            <button
              className="galleryArrow"
              onClick={() =>
                setActiveGallery(
                  (activeGallery - 1 + galleryImages.length) %
                    galleryImages.length
                )
              }
              aria-label="Previous image"
            >
              ←
            </button>

            <div className="galleryTrack">
              {galleryImages.map((image, index) => (
                <div
                  className={`galleryItem ${
                    index === activeGallery ? "galleryActive" : ""
                  }`}
                  key={image}
                >
                  <img src={IMG(image)} alt="Green Hill Retreat gallery" />
                </div>
              ))}
            </div>

            <button
              className="galleryArrow"
              onClick={() =>
                setActiveGallery((activeGallery + 1) % galleryImages.length)
              }
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>

        <div className="galleryDots">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              className={index === activeGallery ? "dotActive" : ""}
              onClick={() => setActiveGallery(index)}
              aria-label={`Show gallery image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="locationSection">
        <div className="locationIntro reveal">
          <div className="eyebrow darkEyebrow">HOW TO REACH US</div>

          <h2>
            Find your way
            <br />
            to peace.
          </h2>

          <strong>Green Hill Retreat</strong>

          <p>
            Upper Chibbo,
            <br />
            Near Kalimpong,
            <br />
            West Bengal 734301, India
          </p>

          <a
            className="darkButton"
            href="https://www.google.com/maps/search/?api=1&query=27.037694380200875,88.44805850422719"
            target="_blank"
            rel="noreferrer"
          >
            OPEN GOOGLE MAPS →
          </a>
        </div>

        <div className="mapArea">
          <iframe
            title="Green Hill Retreat location"
            src="https://www.google.com/maps?q=27.037694380200875,88.44805850422719&output=embed"
            loading="lazy"
          />
        </div>

        <div id="contact" className="contactPanel reveal">
          <div className="eyebrow">COME STAY WITH US</div>

          <h2>Your quiet corner in the hills awaits.</h2>

          <p>
            Contact us for room availability, food, sightseeing packages or
            anything else you need to plan your stay.
          </p>

          <div className="contactActions">
  <div className="contactCard">
    <span className="contactIcon">☎</span>

    <div className="contactCardContent">
      <small>CALL US</small>
      <a href={"tel:" + phone}>{displayPhone}</a>
      <a href={"tel:" + phone2}>{displayPhone2}</a>
    </div>
  </div>

  <div className="contactCard">
    <span className="contactIcon">✉</span>

    <div className="contactCardContent">
      <small>EMAIL US</small>
      <a href={emailUrl}>{email}</a>
    </div>
  </div>

  <div className="contactCard">
    <span className="contactIcon">◉</span>

    <div className="contactCardContent">
      <small>WHATSAPP</small>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
      >
        Chat with us on WhatsApp →
      </a>
    </div>
  </div>
</div>
</div>
</section>

{/* ROOM DETAILS MODAL */}
{selectedRoom && (
  <div
    className="roomModalOverlay"
    onClick={() => setSelectedRoom(null)}
  >
    <div
      className="roomModal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="roomModalClose"
        onClick={() => setSelectedRoom(null)}
        aria-label="Close room details"
      >
        ×
      </button>

      <div className="roomModalImage">
        <img
          src={IMG(selectedRoom.image)}
          alt={selectedRoom.name}
        />
      </div>

      <div className="roomModalContent">
        <div className="eyebrow darkEyebrow">YOUR STAY</div>

        <h2>{selectedRoom.name}</h2>

        <p className="roomModalDescription">
          {selectedRoom.description}
        </p>

        <div className="roomFacts">
          <div>
            <span>OCCUPANCY</span>
            <strong>{selectedRoom.occupancy}</strong>
          </div>

          <div>
            <span>BED</span>
            <strong>{selectedRoom.bed}</strong>
          </div>

          <div>
            <span>BATHROOM</span>
            <strong>{selectedRoom.bathroom}</strong>
          </div>
        </div>

        <div className="roomAmenities">
          <h3>Room Amenities</h3>

          <div className="roomAmenitiesGrid">
            {selectedRoom.amenities.map((amenity) => (
              <div key={amenity}>
                <span>✓</span>
                <p>{amenity}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="roomModalBottom">
          <div className="roomModalPrice">
            <span>FROM</span>
            <strong>{selectedRoom.price}</strong>
            <small>/ night onwards</small>
          </div>

          <button
  type="button"
  className="modalBookButton"
  onClick={() => {
  if (process.env.NODE_ENV === "production") {
    setSelectedRoom(null);

    document.getElementById("contact")?.scrollIntoView({
      behavior: "smooth",
    });

    return;
  }

  setBookingSelection({
    type: "room",
    name: selectedRoom.name,
    price: selectedRoom.price,
  });

  setSelectedRoom(null);
}}
>
  BOOK NOW
</button>
        </div>
      </div>
    </div>
  </div>
)}
{/* SHARED BOOKING MODAL */}
{bookingSelection && (
  <div
    className="bookingModalOverlay"
    onClick={() => setBookingSelection(null)}
  >
    <div
      className="bookingModal"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        className="bookingModalClose"
        onClick={() => setBookingSelection(null)}
        aria-label="Close booking"
      >
        ×
      </button>

      <div className="bookingModalHeader">
        <div className="eyebrow darkEyebrow">
          BOOK YOUR STAY
        </div>

        <h2>
          {bookingSelection.type === "general"
            ? "Check availability"
            : bookingSelection.name}
        </h2>

        {bookingSelection.price && (
          <p>
            Starting from{" "}
            <strong>{bookingSelection.price}</strong>
          </p>
        )}
      </div>

      <div className="bookingForm">
        <div className="bookingFormField">
          <label htmlFor="bookingCheckIn">CHECK-IN</label>
          <input id="bookingCheckIn" type="date" />
        </div>

        <div className="bookingFormField">
          <label htmlFor="bookingCheckOut">CHECK-OUT</label>
          <input id="bookingCheckOut" type="date" />
        </div>

        <div className="bookingFormField">
          <label htmlFor="bookingAdults">ADULTS</label>
          <select id="bookingAdults" defaultValue="2">
            <option value="1">1 Adult</option>
            <option value="2">2 Adults</option>
            <option value="3">3 Adults</option>
            <option value="4">4 Adults</option>
          </select>
        </div>

        <div className="bookingFormField">
          <label htmlFor="bookingChildren">CHILDREN</label>
          <select id="bookingChildren" defaultValue="0">
            <option value="0">No Children</option>
            <option value="1">1 Child</option>
            <option value="2">2 Children</option>
            <option value="3">3 Children</option>
          </select>
        </div>
      </div>

      <div className="bookingSelectionSummary">
        <span>SELECTED</span>

        <strong>
          {bookingSelection.type === "general"
            ? "Any available stay"
            : bookingSelection.name}
        </strong>

        {bookingSelection.type === "room" && (
          <small>Room booking</small>
        )}

        {bookingSelection.type === "package" && (
          <small>Work From Hills package</small>
        )}
      </div>

      <button
        type="button"
        className="bookingContinueButton"
      >
        CHECK LIVE AVAILABILITY →
      </button>

      <p className="bookingNote">
        Availability and final pricing will be confirmed
        before payment.
      </p>
    </div>
  </div>
)}

{/* FLOATING CONTACT BUTTONS */}
<div className="floatingButtons"></div>

      {/* FLOATING CONTACT BUTTONS */}
      <div className="floatingButtons">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="floatingWhatsApp"
          aria-label="WhatsApp Green Hill Retreat"
        >
          ◉
        </a>

        <a
          href={callUrl}
          className="floatingCall"
          aria-label="Call Green Hill Retreat"
        >
          ☎
        </a>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footerGrid">
          <div className="footerBrand">
            <img src="/logotransparent.png" alt="Green Hill Retreat" />

            <p>
              A peaceful homestay near Kalimpong, where the mountains are 
              quiet and the welcome is warm.
            </p>

            <div className="socials">
              <span>◎</span>
              <span>f</span>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                ◉
              </a>
            </div>
          </div>

          <div>
            <h4>EXPLORE</h4>
            <a href="#about">About</a>
            <a href="#walkthrough">Walkthrough</a>
            <a href="#stay">Stay</a>
            <a href="#food">Food</a>
            <a href="#experiences">Experiences</a>
            <a href="#gallery">Gallery</a>
          </div>

          <div>
            <h4>QUICK LINKS</h4>
            <a href="#location">How To Reach</a>
            <a href="#contact">Contact</a>
            <a href="#contact">Book Your Stay</a>
            <a href="#contact">Privacy Policy</a>
            <a href="#contact">Terms & Conditions</a>
          </div>

          <div>
            <h4>CONTACT</h4>
            <div className="footerContactNumbers">
  <a href={"tel:" + phone}>{displayPhone}</a>
  <a href={"tel:" + phone2}>{displayPhone2}</a>
</div>
            <a href={emailUrl}>{email}</a>

            <p>
              Upper Chibbo,
              <br />
              Near Kalimpong,
              <br />
              West Bengal – 734301, India
            </p>
          </div>

          <div>
            <h4>FOLLOW US</h4>
            <p>
              Stay connected for updates,
              <br />
              beautiful moments and more
              <br />
              from Green Hill Retreat.
            </p>

            <div className="socials footerSocials">
              <span>◎</span>
              <span>f</span>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                ◉
              </a>
            </div>
          </div>
        </div>

        <div className="footerBottom">
          © 2026 Green Hill Retreat. All rights reserved.
        </div>
      </footer>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #f5f0e6;
          color: #16271b;
          font-family: Arial, Helvetica, sans-serif;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        img {
          display: block;
          max-width: 100%;
        }

        .site {
          overflow-x: hidden;
        }

        .container {
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
        }

        .sectionLight {
          background: #f8f4eb;
        }

        /* NAVBAR */

        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 88px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 5%;
          transition: all 0.35s ease;
          background: rgba(248, 244, 235, 0.96);
          border-bottom: 1px solid rgba(35, 53, 38, 0.08);
        }

        .navbarScrolled {
          height: 70px;
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
        }

        .logoWrap {
          display: flex;
          align-items: center;
          width: 145px;
          flex-shrink: 0;
        }

        .logo {
          width: 140px;
          height: auto;
          object-fit: contain;
        }
.brandLogo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: -18px;
  text-decoration: none;
}

.brandName {
  display: flex;
  flex-direction: column;
  line-height: 1.05;
}

.brandName strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;
  font-weight: 400;
  line-height: 0.95;
  color: #183021;
}

.brandName span {
  margin-top: 4px;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.11em;
  color: #a8711d;
  text-transform: uppercase;
}
        .desktopNav {
          display: flex;
          align-items: center;
          gap: 28px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
        }

        .desktopNav > a:not(.navButton) {
          position: relative;
        }

        .desktopNav > a:not(.navButton)::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -9px;
          width: 0;
          height: 2px;
          background: #c68b2c;
          transition: width 0.25s ease;
        }

        .desktopNav > a:not(.navButton):hover::after {
          width: 100%;
        }

        .navButton,
        .goldButton {
          background: #c18421;
          color: white;
          padding: 15px 22px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.05em;
          transition: transform 0.25s ease, background 0.25s ease;
        }
.navButton,
.mobileBook {
  border: 0;
  font-family: inherit;
  cursor: pointer;
}
        .navButton:hover,
        .goldButton:hover {
          background: #a86d15;
          transform: translateY(-2px);
        }

        .mobileBook {
          display: none;
        }

        /* HERO */

        .hero {
          min-height: 720px;
          height: 90vh;
          position: relative;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
        }

        .heroImage {
          position: absolute;
          inset: 0;
          background-image: url("/Images/hero.jpeg");
          background-size: cover;
          background-position: center;
          transform: scale(1.04);
          animation: heroZoom 12s ease-out forwards;
        }

        @keyframes heroZoom {
          from {
            transform: scale(1.08);
          }
          to {
            transform: scale(1);
          }
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              90deg,
              rgba(5, 20, 11, 0.78) 0%,
              rgba(5, 20, 11, 0.42) 42%,
              rgba(5, 20, 11, 0.05) 100%
            ),
            linear-gradient(
              0deg,
              rgba(3, 14, 7, 0.45),
              transparent 45%
            );
        }

        .heroContent {
          position: relative;
          z-index: 2;
          width: min(1180px, calc(100% - 80px));
          margin: 0 auto;
          padding-top: 90px;
        }

        .eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #d59a36;
          margin-bottom: 15px;
        }

        .darkEyebrow {
          color: #ae731c;
        }

        .heroContent h1 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(58px, 6vw, 92px);
          font-weight: 400;
          line-height: 0.94;
          margin: 0 0 25px;
          letter-spacing: -0.04em;
        }

        .heroContent p {
          font-size: 17px;
          line-height: 1.55;
          margin: 0 0 28px;
        }

        .heroButtons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }

        .outlineButton {
          border: 1px solid rgba(255, 255, 255, 0.8);
          padding: 15px 22px;
          border-radius: 3px;
          font-size: 10px;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .outlineButton:hover {
          background: white;
          color: #17301e;
        }
/* HERO AVAILABILITY BAR */

.heroBookingBar {
  position: absolute;
  z-index: 5;
  left: 50%;
  bottom: 48px;
  transform: translateX(-50%);

  width: min(900px, calc(100% - 140px));
  min-height: 74px;

  display: grid;
  grid-template-columns:
    minmax(180px, 1fr)
    1px
    minmax(180px, 1fr)
    1px
    minmax(130px, 0.7fr)
    auto;

  align-items: stretch;

  background: rgba(250, 246, 237, 0.96);
  border-radius: 8px;
  overflow: hidden;

  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.24);

  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.bookingField {
  min-width: 0;
  padding: 14px 18px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 7px;
}

.bookingField label {
  color: #a46d1a;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.bookingField input,
.bookingField select {
  width: 100%;
  min-width: 0;

  border: 0;
  outline: 0;
  background: transparent;

  color: #183021;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 17px;

  cursor: pointer;
}

.bookingField input {
  padding: 0;
}

.bookingField select {
  appearance: none;
  -webkit-appearance: none;
}

.bookingDivider {
  width: 1px;
  margin: 16px 0;
  background: #ded5c7;
}

.heroAvailabilityButton {
  min-width: 190px;
  padding: 0 28px;

  border: 0;

  background: #bd7f1f;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.09em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    padding 0.25s ease;
}

.heroAvailabilityButton:hover {
  background: #986316;
}

.heroAvailabilityButton span {
  font-size: 14px;
}
        .scrollIndicator {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 8px;
          letter-spacing: 0.13em;
        }

        .mouseIcon {
          width: 20px;
          height: 30px;
          border: 1px solid white;
          border-radius: 12px;
          display: grid;
          place-items: center;
          animation: mouseBounce 1.7s infinite;
        }

        @keyframes mouseBounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(5px);
          }
        }

        .heroDots {
          position: absolute;
          right: 22px;
          top: 50%;
          display: flex;
          flex-direction: column;
          gap: 11px;
          z-index: 4;
        }

        .heroDots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: 1px solid white;
        }

        .heroDots .active {
          background: #d49b34;
          border-color: #d49b34;
        }

        /* ABOUT */

.about {
  position: relative;
  padding: 90px 0 100px;
  overflow: hidden;
}

.aboutGrid {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  gap: 64px;
  align-items: center;
}

.aboutText {
  min-width: 0;
}

.aboutText h2,
.galleryIntro h2,
.staySection h2 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(38px, 4vw, 56px);
  line-height: 0.98;
  font-weight: 400;
  margin: 0 0 24px;
  color: #18291c;
}

.aboutText p {
  color: #4e554e;
  font-size: 15px;
  line-height: 1.75;
  margin: 0 0 18px;
  max-width: 570px;
}

.featureGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin: 36px 0 28px;
  max-width: 560px;
}

.featureGrid div {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.featureGrid span {
  font-size: 30px;
  line-height: 1;
  margin-bottom: 10px;
  color: #17331f;
}

.featureGrid strong {
  font-size: 11px;
  line-height: 1.3;
}

.featureGrid small {
  font-size: 10px;
  color: #6c716a;
  margin-top: 4px;
  line-height: 1.3;
}

.textLink {
  display: inline-block;
  font-size: 10px;
  color: #b27318;
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-top: 2px;
}

/* ABOUT IMAGE COLLAGE */

.aboutImages {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 14px;
  height: 455px;
  align-items: stretch;
}

.aboutMainImage {
  height: 455px;
  min-height: 0;
  overflow: hidden;
  border-radius: 10px;
}

.aboutMainImage img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.aboutSideImages {
  display: grid;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 14px;
  height: 455px;
  min-height: 0;
}

.aboutSideImages img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 0;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
  transition: transform 0.7s ease;
}

.aboutSideImages img:hover {
  transform: scale(1.025);
}

/* IMPORTANT:
   The dot before aboutSideImages is required. */
.aboutSideImages img {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  object-fit: cover;
  object-position: center bottom;
}

/* Decorative leaves */

.leafDecoration {
  position: absolute;
  color: rgba(82, 111, 77, 0.16);
  font-size: 150px;
  line-height: 1;
  pointer-events: none;
  z-index: 0;
}

.leftLeaf {
  left: -30px;
  bottom: 20px;
  transform: rotate(-20deg);
}

.rightLeaf {
  right: -35px;
  top: 40px;
  transform: rotate(20deg);
}

/* ABOUT — TABLET */

@media (max-width: 1000px) {
  .about {
    padding: 75px 0 85px;
  }

  .aboutGrid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .aboutText {
    max-width: 700px;
  }

  .aboutImages {
    height: 500px;
  }

  .aboutMainImage {
    height: 500px;
  }
}

/* ABOUT — MOBILE */

@media (max-width: 640px) {
.brandName strong {
  font-size: 12px;
  line-height: 0.95;
}

.brandName span {
  font-size: 5px;
}

.brandLogo {
  gap: 6px;
}
  .contactActions {
  grid-template-columns: 1fr !important;
  gap: 8px !important;

  border: 0;
  border-radius: 0;
  overflow: visible;
}

.contactCard {
  min-height: 0;
  width: 100%;

  padding: 13px 14px;

  grid-template-columns: 28px minmax(0, 1fr);
  gap: 10px;

  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 7px;
}

.contactCard:last-child {
  border-right: 1px solid rgba(255, 255, 255, 0.1);
}

.contactIcon {
  width: 28px;
  height: 28px;
  font-size: 18px;
}

.contactCardContent small {
  margin-bottom: 7px;
  font-size: 7px;
}

.contactCardContent a {
  font-size: 9px;
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
}

.roomModalOverlay {
  padding: 14px;
  align-items: center;
  justify-content: center;
}

.roomModal {
  display: block !important;
  grid-template-columns: none !important;

  width: calc(100vw - 28px) !important;
  max-width: calc(100vw - 28px) !important;

  max-height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;

  border-radius: 12px;
}

.roomModalImage {
  display: block !important;
  width: 100% !important;
  height: 220px !important;
  min-height: 220px !important;
  max-width: 100% !important;

  overflow: hidden;
}

.roomModalImage img {
  display: block;
  width: 100% !important;
  height: 100% !important;

  object-fit: cover;
  object-position: center;
}

.roomModalContent {
  display: block;
  width: 100%;
  max-width: 100%;

  padding: 26px 20px 28px;
  box-sizing: border-box;
}

.roomModalContent h2 {
  font-size: 30px;
  line-height: 1.05;
}

.roomFacts {
  grid-template-columns: 1fr;
  gap: 8px;
}

.roomAmenitiesGrid {
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.roomModalBottom {
  align-items: center;
  gap: 15px;
}

.modalBookButton {
  padding: 13px 17px;
}
  .about {
    padding: 60px 0 70px;
  }

  .aboutGrid {
    gap: 36px;
  }

  .aboutText h2,
  .galleryIntro h2,
  .staySection h2 {
    font-size: 42px;
    line-height: 1;
    margin-bottom: 20px;
  }

  .aboutText p {
    font-size: 14px;
    line-height: 1.7;
  }

  .featureGrid {
    gap: 8px;
    margin: 30px 0 24px;
  }

  .featureGrid span {
    font-size: 26px;
  }

  .featureGrid strong {
    font-size: 10px;
  }

  .featureGrid small {
    font-size: 9px;
  }

  .aboutImages {
    grid-template-columns: 1.25fr 0.9fr;
    gap: 8px;
    height: 380px;
  }

  .aboutMainImage {
    height: 380px;
  }

  .aboutSideImages {
    gap: 8px;
  }

  .leafDecoration {
    font-size: 100px;
  }
    .stayBlock {
  margin-bottom: 60px;
}

.stayHeading {
  margin-bottom: 28px;
}

.experienceBlock {
  padding-top: 45px;
  border-top: 1px solid rgba(24, 41, 28, 0.12);
}

.experienceHeading {
  text-align: left;
  margin-bottom: 28px;
}

.experienceHeading p {
  margin-left: 0;
  margin-right: 0;
}

.roomsGrid,
.experienceGrid {
  grid-template-columns: 1fr;
}
  

.workFromHillsSection {
  padding: 42px 0;
}

.workFromHillsBanner {
  min-height: 0;
  padding: 30px 20px;
  grid-template-columns: 1fr;
  gap: 22px;
  border-radius: 9px;
}

.workBannerContent h2 {
  font-size: 34px;
  line-height: 1;
  margin: 9px 0 14px;
}

.workBannerContent > p {
  font-size: 11px;
  line-height: 1.6;
  margin-bottom: 18px;
}

.workBannerLink {
  font-size: 8px;
}

.wifiHighlight {
  padding: 16px;
  gap: 12px;
}

.wifiIcon {
  flex-basis: 38px;
  width: 38px;
  height: 38px;
  font-size: 20px;
}

.wifiHighlight strong {
  font-size: 17px;
}

.wifiHighlight small {
  margin-top: 6px;
  font-size: 9px;
}

.workPackagesIntro {
  margin: 34px 0 20px;
  grid-template-columns: 1fr;
  gap: 10px;
}

.workPackagesIntro h2 {
  font-size: 32px;
  margin: 6px 0 12px;
}

.workPackagesIntro > p {
  margin: 0;
  max-width: 100%;
  font-size: 10px;
  line-height: 1.6;
  color: #697069; 
}

.workPackagesGrid {
  display: grid !important;
  grid-template-columns: 1fr !important;
  gap: 9px;
  width: 100%;
}

.workPackageCard {
padding: 13px 14px 11px;
  row-gap: 3px;
  display: grid !important;
  grid-template-columns: minmax(0, 1fr) 105px;
  grid-template-areas:
    "duration price"
    "title price"
    "description button"
    "includes includes";

  width: 100%;
  min-width: 0;
  padding: 16px 16px 14px;
  column-gap: 14px;
  row-gap: 5px;
  align-items: center;
}

.packageDuration {
  grid-area: duration;
}

.workPackageCard h3 {
  grid-area: title;
  margin: 1px 0;
  font-size: 18px;
  line-height: 1.1;
}

.packageDescription {
  grid-area: description;
  display :none ;
}

.packageIncludes {
  grid-area: includes;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px 10px;
  width: 100%;
  margin-top: 5px;
  padding: 7px 0 0;
  border-top: 1px solid #e5dccd;
  border-bottom: 0;
}

.packageIncludes > div {
  display: flex;
  align-items: center;
  gap: 4px;
}

.packageIncludes p {
  margin: 0;
  font-size: 7.5px;
}

.packageIncludes span {
  font-size: 8px;
}

.packageBottom {
  display: contents;
  padding-top: 8px;
}

.packagePrice {
  grid-area: price;
  width: 105px;
  min-width: 0;
  align-items: flex-end;
  text-align: right;
}

.packagePrice > span {
  display: none;
}

.packagePrice strong {
  display: block;
  font-size: 18px;
  line-height: 1;
  white-space: nowrap;
}

.packagePrice small {
  display: block;
  margin-top: 4px;
  font-size: 6px;
  white-space: nowrap;
}

.packageBookButton {
  grid-area: button;
  width: 105px;
  padding: 8px 10px;
  font-size: 6.5px;
  white-space: nowrap;
}

.packageFootnote {
  margin-top: 14px;
  font-size: 7px;
  line-height: 1.5;
}
  .heroBookingBar {
  position: absolute;
  left: 16px;
  right: 16px;
  bottom: 22px;

  transform: none;

  width: auto;
  min-height: 0;

  display: grid;
  grid-template-columns: 1fr 1fr;

  border-radius: 8px;
  overflow: hidden;
}

.bookingField {
  padding: 12px 13px;
  gap: 4px;
}

.bookingField label {
  font-size: 6px;
}

.bookingField input,
.bookingField select {
  font-size: 13px;
}

.bookingDivider {
  display: none;
}

.guestField {
  border-top: 1px solid #e1d8ca;
}

.heroAvailabilityButton {
  min-width: 0;
  min-height: 54px;

  padding: 10px 12px;

  font-size: 7px;

  border-top: 1px solid rgba(255, 255, 255, 0.12);
}
  .scrollHook {
  min-height: 46px;
  padding: 8px 14px;
  gap: 7px;
}

.scrollHook strong {
  font-size: 11px;
}

.scrollHook > span:first-child {
  display: none;
}
  .bookingModalOverlay {
  padding: 14px;
}

.bookingModal {
  width: 100%;
  max-height: 90vh;

  padding: 34px 20px 24px;

  border-radius: 11px;
}

.bookingModalHeader h2 {
  font-size: 30px;
}

.bookingForm {
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.bookingFormField {
  padding: 11px;
}

.bookingFormField input,
.bookingFormField select {
  font-size: 12px;
}

.bookingContinueButton {
  padding: 14px 10px;
}
}

        /* WALKTHROUGH */

        .walkthroughSection {
          background: #082516;
          color: white;
          padding: 75px 0;
          position: relative;
          overflow: hidden;
        }

        .walkthroughSection::before,
        .walkthroughSection::after {
          content: "";
          position: absolute;
          width: 350px;
          height: 350px;
          border: 1px solid rgba(198, 139, 44, 0.1);
          border-radius: 50%;
        }

        .walkthroughSection::before {
          left: -200px;
          top: -100px;
        }

        .walkthroughSection::after {
          right: -200px;
          bottom: -180px;
        }

        .walkthroughGrid {
          display: grid;
          grid-template-columns: 0.7fr 1.3fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .walkthroughText h2,
        .foodText h2,
        .amenities h2,
        .contactPanel h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-weight: 400;
          font-size: clamp(38px, 4vw, 55px);
          line-height: 1;
          margin: 0 0 20px;
        }

        .walkthroughText p,
        .foodText p,
        .contactPanel p {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.8;
          margin-bottom: 25px;
        }

        .videoCard {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }

        .videoCard video {
          display: block;
          width: 100%;
          height: 390px;
          object-fit: cover;
          background: #000;
          position: relative;
          z-index: 2;
        }

        .videoGlow {
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(204, 150, 47, 0.35);
          border-radius: 10px;
          animation: glowPulse 3s infinite;
        }

        @keyframes glowPulse {
          0%,
          100% {
            opacity: 0.25;
          }
          50% {
            opacity: 0.7;
          }
        }

        /* STAY */

        .staySection {
          padding: 90px 0 60px;
        }

        .twoColumnHeading {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          margin-bottom: 35px;
        }

        .twoColumnHeading h2 {
          margin-bottom: 10px;
        }

        .twoColumnHeading p {
          max-width: 470px;
          font-size: 13px;
          line-height: 1.6;
          color: #676b64;
        }

        .experienceHeading {
  text-align: center;
  margin-bottom: 35px;
}

.experienceHeading p {
  margin-left: auto;
  margin-right: auto;
}

.stayBlock {
  margin-bottom: 80px;
}

.stayHeading {
  margin-bottom: 35px;
}

.experienceBlock {
  margin-top: 20px;
}

.stayExperienceGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}
          
        }

        .roomsGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
  width: 100%;
}

.roomCard {
  min-width: 0;
}
        }

        .roomCard {
          background: #fffaf1;
          border-radius: 7px;
          overflow: hidden;
          border: 1px solid #e8dfd0;
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .roomCard:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 40px rgba(38, 50, 40, 0.12);
        }

        .roomImage {
          height: 260px;
          position: relative;
          overflow: hidden;
        }

        .roomImage img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .roomCard:hover .roomImage img {
          transform: scale(1.06);
        }

        .roomImage span {
          position: absolute;
          left: 14px;
          bottom: 12px;
          background: rgba(16, 43, 25, 0.85);
          color: white;
          padding: 7px 9px;
          font-size: 8px;
          letter-spacing: 0.1em;
        }

        .roomBody {
          padding: 18px;
        }

        .roomBody h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 22px;
          font-weight: 400;
          margin: 0 0 8px;
        }

        .roomBody p {
          color: #6d716b;
          font-size: 11px;
          line-height: 1.6;
          min-height: 53px;
        }

        .roomBottom {
          margin-top: 15px;
        }

        .roomBottom strong {
          font-size: 18px;
        }

        .roomBottom span {
          color: #777;
          font-size: 9px;
        }

        .roomBody > a,


        .experienceCard > a {
          display: inline-block;
          margin-top: 15px;
          color: #b67418;
          font-size: 9px;
          font-weight: 700;
        }

        .experienceGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 15px;
        }

        .experienceCard {
          padding: 30px 20px;
          text-align: center;
          background: #fffaf1;
          border: 1px solid #e8dfd0;
          border-radius: 6px;
          transition: all 0.35s ease;
        }

        .experienceCard:hover {
          transform: translateY(-8px);
          background: #f1eadc;
        }

        .experienceIcon {
          font-size: 34px;
          margin-bottom: 12px;
          color: #1b3a24;
        }

        .experienceCard > span {
          font-size: 9px;
          color: #ba7d20;
          font-weight: 700;
        }

        .experienceCard h3 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-weight: 400;
          margin: 8px 0 12px;
        }

        .experienceCard p {
          font-size: 10px;
          color: #686d66;
          line-height: 1.6;
        }

        .centerLink {
          text-align: center;
          margin-top: 35px;
        }

        .centerLink a {
          color: #b67418;
          font-size: 10px;
          font-weight: 700;
        }

        /* FOOD */

        .foodSection {
          background: #072416;
          color: white;
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          min-height: 380px;
        }

        .foodImage {
          background: url("/Images/room-1.jpeg") center / cover;
          min-height: 380px;
          position: relative;
        }

        .foodImage::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(0, 0, 0, 0.05), #072416);
        }

        .foodText {
          padding: 65px 30px;
          position: relative;
          z-index: 2;
        }

        .foodText h2 {
          font-size: 45px;
        }

        .foodText a {
          font-size: 9px;
          color: #d5a048;
          font-weight: 700;
        }

        .amenities {
          padding: 65px 5%;
          background: rgba(0, 0, 0, 0.08);
        }

        .amenities h2 {
          font-size: 42px;
        }

        .amenityGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 25px 15px;
          margin-top: 30px;
        }

        .amenity {
          text-align: center;
        }

        .amenity span {
          display: block;
          color: #d59b3a;
          font-size: 25px;
          margin-bottom: 8px;
        }

        .amenity small {
          font-size: 9px;
          opacity: 0.85;
        }

        /* GALLERY */

        .gallerySection {
          padding: 75px 0 35px;
        }

        .galleryLayout {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 45px;
          align-items: center;
        }

        .galleryIntro h2 {
          font-size: 55px;
        }

        .galleryIntro p {
          font-size: 12px;
          color: #696d67;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .darkGold {
          display: inline-block;
          padding: 12px 17px;
          font-size: 9px;
        }

        .gallerySlider {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .galleryTrack {
          flex: 1;
          display: flex;
          gap: 10px;
          overflow: hidden;
        }

        .galleryItem {
          flex: 1;
          min-width: 0;
          height: 190px;
          overflow: hidden;
          border-radius: 6px;
          opacity: 0.55;
          transform: scale(0.96);
          transition: all 0.5s ease;
        }

        .galleryItem.galleryActive {
          opacity: 1;
          transform: scale(1);
        }

        .galleryItem img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .galleryArrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1px solid #ddd4c5;
          background: #f8f4eb;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
        }

        .galleryArrow:hover {
          background: #c18421;
          color: white;
          border-color: #c18421;
        }

        .galleryDots {
          display: flex;
          justify-content: center;
          gap: 7px;
          margin-top: 20px;
        }

        .galleryDots button {
          border: 0;
          width: 25px;
          height: 3px;
          background: #d5cbb9;
          cursor: pointer;
          padding: 0;
        }

        .galleryDots .dotActive {
          background: #b67418;
        }

        /* LOCATION */

        .locationSection {
          display: grid;
          grid-template-columns: 0.65fr 1fr 1.35fr;
          min-height: 370px;
        }

        .locationIntro {
          background: #f8f4eb;
          padding: 55px 45px;
        }

        .locationIntro h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 42px;
          font-weight: 400;
          line-height: 1;
          margin: 0 0 20px;
        }

        .locationIntro strong {
          font-size: 11px;
        }

        .locationIntro p {
          font-size: 11px;
          line-height: 1.5;
          color: #686d66;
          margin-bottom: 20px;
        }

        .darkButton {
          display: inline-block;
          padding: 13px 16px;
          background: #082617;
          color: white;
          font-size: 9px;
          font-weight: 700;
          border-radius: 3px;
        }

        .mapArea {
          min-height: 370px;
          background: #d9dfc8;
        }

        .mapArea iframe {
          border: 0;
          width: 100%;
          height: 100%;
          min-height: 370px;
          filter: saturate(0.7);
        }

        .contactPanel {
          background: #082617;
          color: white;
          padding: 55px 45px;
        }

        .contactPanel h2 {
          font-size: 39px;
        }
/* CONTACT ACTION CARDS */

.contactActions {
  display: grid;
  grid-template-columns: 1.1fr 1.35fr 1fr;
  gap: 0;
  margin-top: 28px;

  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  overflow: hidden;
}

.contactCard {
  min-width: 0;
  min-height: 92px;

  padding: 17px 15px;

  display: grid;
  grid-template-columns: 26px minmax(0, 1fr);
  gap: 10px;
  align-items: start;

  border: 0;
  border-right: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 0;

  transition:
    background 0.3s ease,
    transform 0.3s ease;
}

.contactCard:last-child {
  border-right: 0;
}

.contactCard:hover {
  background: rgba(196, 132, 32, 0.18);
}
}

.contactIcon {
  width: 30px;
  height: 30px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #d29a36;
  font-size: 20px;
  line-height: 1;
}

.contactCardContent {
  min-width: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.contactCardContent small {
  margin: 1px 0 9px;

  color: #d29a36;
  font-size: 8px;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.1em;
}

.contactCardContent a {
  display: block;
  color: white;
  text-decoration: none;

  font-size: 9px;
  font-weight: 400;
  line-height: 1.6;

  white-space: nowrap;

  transition: color 0.25s ease;
}

.contactCardContent a:hover {
  color: #efb34a;
}
        

.roomCard {
  cursor: pointer;
}

.roomActions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 18px;
}

.roomDetailsButton,
.roomBookButton {
  border: 0;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
}

.roomDetailsButton {
  padding: 0;
  background: transparent;
  color: #a96f19;
}

.roomBookButton {
  margin-left: auto;
  padding: 10px 16px;
  background: #b97d20;
  color: white;
  border-radius: 3px;
}

.roomModalOverlay {
animation: roomOverlayIn 0.45s ease-out both;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(4, 20, 12, 0.64);
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.roomModal {
animation: roomModalIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
transform-origin: center center;
will-change: transform, opacity;
  position: relative;
  width: min(960px, 100%);
  max-height: calc(100vh - 60px);
  overflow-y: auto;
  background: #f8f4eb;
  border-radius: 12px;
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.35);
}

.roomModalClose {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 5;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #193021;
  font-size: 25px;
  line-height: 1;
  cursor: pointer;
}

.roomModalImage {
  min-height: 560px;
  overflow: hidden;
}

.roomModalImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.roomModalContent {
  padding: 52px 46px 42px;
}

.roomModalContent h2 {
  margin: 9px 0 15px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  font-weight: 400;
}

.roomModalDescription {
  color: #6a716a;
  font-size: 13px;
  line-height: 1.7;
}

.roomFacts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 28px 0;
}

.roomFacts > div {
  padding: 14px;
  background: #eee7da;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.roomFacts span,
.roomModalPrice > span {
  color: #9a6b24;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.roomFacts strong {
  font-size: 11px;
}

.roomAmenities {
  padding-top: 22px;
  border-top: 1px solid #ddd4c5;
}

.roomAmenities h3 {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 20px;
  font-weight: 400;
  margin: 0 0 18px;
}

.roomAmenitiesGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 18px;
}

.roomAmenitiesGrid > div {
  display: flex;
  gap: 9px;
  align-items: center;
}

.roomAmenitiesGrid span {
  color: #a96f19;
}

.roomAmenitiesGrid p {
  margin: 0;
  color: #555f57;
  font-size: 11px;
}

.roomModalBottom {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #ddd4c5;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
}

.roomModalPrice {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.roomModalPrice strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 28px;
  font-weight: 400;
}

.roomModalPrice small {
  color: #777d76;
  font-size: 9px;
}

.modalBookButton {
  border: 0;
  padding: 14px 25px;
  background: #b97d20;
  color: white;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
}
  .modalBookButton {
  border: 0;
  padding: 14px 25px;
  background: #b97d20;
  color: white;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
}

@keyframes roomOverlayIn {
  0% {
    opacity: 0;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
  }

  100% {
    opacity: 1;
    backdrop-filter: blur(9px);
    -webkit-backdrop-filter: blur(9px);
  }
}

@keyframes roomModalIn {
  0% {
    opacity: 0;
    transform: translateY(45px) scale(0.88);
  }

  60% {
    opacity: 1;
    transform: translateY(-4px) scale(1.015);
  }

  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
  /* SHARED BOOKING MODAL */

.bookingModalOverlay {
  position: fixed;
  inset: 0;
  z-index: 10000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 28px;

  background: rgba(4, 20, 12, 0.68);

  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);

  animation: bookingOverlayIn 0.3s ease both;
}

.bookingModal {
  position: relative;

  width: min(650px, 100%);
  max-height: calc(100vh - 56px);
  overflow-y: auto;

  padding: 42px;

  background: #f8f4eb;
  color: #183021;

  border-radius: 12px;

  box-shadow: 0 35px 90px rgba(0, 0, 0, 0.35);

  animation: bookingModalIn 0.4s
    cubic-bezier(0.16, 1, 0.3, 1) both;
}

.bookingModalClose {
  position: absolute;
  top: 15px;
  right: 15px;

  width: 38px;
  height: 38px;

  border: 0;
  border-radius: 50%;

  background: white;
  color: #183021;

  font-size: 24px;

  cursor: pointer;
}

.bookingModalHeader h2 {
  margin: 8px 0 10px;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 38px;
  font-weight: 400;
}

.bookingModalHeader p {
  margin: 0;
  color: #70766f;
  font-size: 11px;
}

.bookingForm {
  margin-top: 30px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.bookingFormField {
  padding: 15px;

  display: flex;
  flex-direction: column;
  gap: 7px;

  background: #eee7da;

  border-radius: 6px;
}

.bookingFormField label {
  color: #a56e1b;

  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.bookingFormField input,
.bookingFormField select {
  width: 100%;

  border: 0;
  outline: 0;

  background: transparent;
  color: #183021;

  font-family: Georgia, "Times New Roman", serif;
  font-size: 15px;
}

.bookingSelectionSummary {
  margin-top: 20px;
  padding: 16px 18px;

  display: flex;
  flex-direction: column;
  gap: 4px;

  border: 1px solid #ddd2c1;
  border-radius: 6px;
}

.bookingSelectionSummary span {
  color: #a56e1b;

  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.bookingSelectionSummary strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 18px;
  font-weight: 400;
}

.bookingSelectionSummary small {
  color: #777d76;
  font-size: 9px;
}

.bookingContinueButton {
  width: 100%;

  margin-top: 20px;
  padding: 15px;

  border: 0;
  border-radius: 4px;

  background: #bd7f1f;
  color: white;

  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.09em;

  cursor: pointer;

  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.bookingContinueButton:hover {
  background: #986316;
  transform: translateY(-2px);
}

.bookingNote {
  margin: 10px 0 0;

  color: #8a8e88;

  text-align: center;

  font-size: 8px;
}

@keyframes bookingOverlayIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes bookingModalIn {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
/* WORK FROM HILLS */

.workFromHillsSection {
  padding: 60px 0;
  background: #f5efe4;
}

.workFromHillsBanner {
  position: relative;
  overflow: hidden;
  min-height: 300px;
  padding: 42px 46px;
  gap: 38px;
  border-radius: 12px;
  background:
    radial-gradient(
      circle at 85% 30%,
      rgba(199, 139, 35, 0.22),
      transparent 32%
    ),
    linear-gradient(135deg, #062b19 0%, #103d28 100%);
  color: white;

  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  align-items: center;
  gap: 60px;
}

.workBannerContent {
  max-width: 650px;
}

.workBannerContent h2 {
  margin: 12px 0 20px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(36px, 4vw, 54px);
  line-height: 0.98;
  font-weight: 400;
}

.workBannerContent > p {
  max-width: 600px;
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  line-height: 1.75;
  margin-bottom: 28px;
}

.workBannerLink {
  color: #dda847;
  text-decoration: none;
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.wifiHighlight {
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  display: flex;
  gap: 18px;
  align-items: flex-start;
}

.wifiIcon {
  flex: 0 0 52px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #c18423;
  color: white;
  font-size: 25px;
}

.wifiHighlight > div:last-child {
  display: flex;
  flex-direction: column;
}

.wifiHighlight span {
  color: #dda847;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.11em;
  margin-bottom: 7px;
}

.wifiHighlight strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-weight: 400;
  line-height: 1.15;
}

.wifiHighlight small {
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 10px;
  line-height: 1.6;
}

.workPackagesIntro {
  margin: 45px 0 25px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: end;
  gap: 60px;
}

.workPackagesIntro h2 {
  margin: 8px 0 0;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 42px;
  font-weight: 400;
}

.workPackagesIntro > p {
  max-width: 520px;
  margin: 0 0 4px auto;
  color: #697069;
  font-size: 12px;
  line-height: 1.7;
}

.workPackagesGrid {
  display: grid;
  grid-template-columns: 1fr !important;
  gap: 18px;
}

.workPackageCard {
  position: relative;
  min-width: 0;
  padding: 22px 20px 18px;
  background: #fffaf1;
  border: 1px solid #e4dac9;
  border-radius: 9px;
  display: flex;
  flex-direction: column;
  transition:
    transform 0.35s ease,
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.workPackageCard:hover {
  transform: translateY(-7px);
  box-shadow: 0 18px 42px rgba(25, 48, 33, 0.1);
}

.workPackageCard.featured {
  border-color: #bd8022;
  box-shadow: 0 15px 40px rgba(25, 48, 33, 0.08);
}

.packageBadge {
  position: absolute;
  top: 0;
  right: 24px;
  transform: translateY(-50%);
  padding: 7px 12px;
  background: #b97d20;
  color: white;
  border-radius: 20px;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.1em;
}

.packageDuration {
  color: #ae741d;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.workPackageCard h3 {
  margin: 8px 0 8px;
  font-family: Georgia, "Times New Roman", serif;
  font-size: 23px;
  font-weight: 400;
}

.packageDescription {
  min-height: 44px;
  margin: 0;
  color: #70766f;
  font-size: 10px;
  line-height: 1.5;
}

.packageIncludes {
  padding: 12px 0;
  margin-top: 10px;
  border-top: 1px solid #e5dccd;
  border-bottom: 1px solid #e5dccd;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.packageIncludes > div {
  display: flex;
  align-items: center;
  gap: 9px;
}

.packageIncludes span {
  color: #b97d20;
  font-size: 13px;
}

.packageIncludes p {
  margin: 0;
  color: #505950;
  font-size: 9px;
}

.packageBottom {
  margin-top: auto;
  padding-top: 12px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
}

.packagePrice {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.packagePrice > span {
  color: #9b6b20;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.11em;
}

.packagePrice strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 22px;
  font-weight: 400;
}

.packagePrice small {
  color: #858a84;
  font-size: 8px;
}

.packageBookButton {
  flex-shrink: 0;
  border: 0;
  padding: 10px 14px;
  border-radius: 3px;
  background: #b97d20;
  color: white;
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.09em;
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.packageBookButton:hover {
  background: #986316;
  transform: translateY(-2px);
}
 

.packageFootnote {
  margin: 18px 0 0;
  color: #93968f;
  font-size: 8px;
  text-align: center;
}

 @media (max-width: 420px) {
  .packageDescription {
    display: none;
  }
}
  .scrollHook {
  min-height: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 10px 20px;
  background: #0b2f1d;
  color: white;
  text-align: center;
}

.scrollHook > span:first-child {
  color: #d49a37;
  font-size: 7px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.scrollHook strong {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 14px;
  font-weight: 400;
}

.scrollHookArrow {
  display: inline-block;
  color: #d49a37;
  font-size: 17px;
  animation: scrollHookBounce 1.8s ease-in-out infinite;
}

@keyframes scrollHookBounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(5px);
  }
}
        /* FLOATING BUTTONS */

        .floatingButtons {
          position: fixed;
          right: 20px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 9px;
          z-index: 99;
        }

        .floatingButtons a {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          color: white;
          box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
          transition: transform 0.25s ease;
        }

        .floatingButtons a:hover {
          transform: scale(1.1);
        }

        .floatingWhatsApp {
          background: #1d7a48;
        }

        .floatingCall {
          background: #b7791f;
        }

        /* FOOTER */

        .footer {
          background: #061d12;
          color: white;
          padding: 55px 0 20px;
        }

        .footerGrid {
          display: grid;
          grid-template-columns: 1.4fr repeat(4, 1fr);
          gap: 40px;
        }
          .footerContactNumbers {
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-bottom: 8px;
}

.footerContactNumbers a {
  color: inherit;
  text-decoration: none;
  font-size: 11px;
  line-height: 1.5;
  font-weight: 400;
}

        .footerBrand img {
          width: 145px;
          opacity: 0.95;
          margin-bottom: 20px;
        }

        .footerBrand p,
        .footer p {
          color: rgba(255, 255, 255, 0.65);
          font-size: 10px;
          line-height: 1.65;
        }

        .footer h4 {
          color: #d59a36;
          font-size: 9px;
          letter-spacing: 0.1em;
          margin: 0 0 17px;
        }

        .footerGrid > div:not(.footerBrand) > a {
          display: block;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.72);
          margin-bottom: 9px;
        }

        .socials {
          display: flex;
          gap: 12px;
          margin-top: 18px;
        }

        .socials span,
        .socials a {
          width: 26px;
          height: 26px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 11px;
        }

        .footerBottom {
          width: min(1180px, calc(100% - 80px));
          margin: 45px auto 0;
          padding-top: 18px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.45);
          font-size: 9px;
        }

        /* SCROLL ANIMATION */

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition:
            opacity 0.8s ease,
            transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* MOBILE */

        @media (max-width: 1000px) {
          .desktopNav {
            gap: 14px;
          }

          .container {
            width: min(100% - 40px, 760px);
          }

          .heroContent {
            width: calc(100% - 40px);
          }

          .aboutGrid,
          .walkthroughGrid {
            grid-template-columns: 1fr;
          }

          .aboutImages {
            height: 450px;
          }

          .stayExperienceGrid {
            grid-template-columns: 1fr;
          }

          .foodSection {
            grid-template-columns: 1fr 1fr;
          }

          .foodImage {
            display: none;
          }

          .locationSection {
            grid-template-columns: 1fr 1fr;
          }

          .contactPanel {
            grid-column: 1 / -1;
          }

          .footerGrid {
            grid-template-columns: repeat(3, 1fr);
          }

          .footerBrand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 700px) {
          .navbar {
            height: 70px;
            padding: 0 18px;
          }

          .navbarScrolled {
            height: 62px;
          }

          .logoWrap,
          .logo {
            width: 118px;
          }

          .desktopNav {
            display: none;
          }

          .mobileBook {
            display: block;
            background: #b7791f;
            color: white;
            padding: 10px 13px;
            border-radius: 3px;
            font-size: 9px;
            font-weight: 700;
          }

          .hero {
            min-height: 720px;
            height: 100svh;
            max-height: 850px;
          }

          .heroContent {
            padding-top: 70px;
          }

          .heroContent h1 {
            font-size: clamp(48px, 14vw, 72px);
          }

          .heroContent p {
            font-size: 15px;
          }

          .scrollIndicator {
            display: none;
          }

          .heroDots {
            right: 15px;
          }

          .container {
            width: calc(100% - 32px);
          }

          .about,
          .staySection,
          .gallerySection {
            padding: 60px 0;
          }

          .aboutGrid {
            gap: 40px;
          }

          .aboutText h2,
          .staySection h2,
          .galleryIntro h2 {
            font-size: 40px;
          }

          .featureGrid {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px 10px;
          }

          .aboutImages {
            height: 450px;
            grid-template-columns: 1fr;
          }

          .aboutMainImage {
            height: 280px;
          }

          .aboutSideImages {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 160px;
          }

          .walkthroughSection {
            padding: 60px 0;
          }

          .walkthroughGrid {
            gap: 35px;
          }

          .walkthroughText h2,
          .foodText h2,
          .amenities h2,
          .contactPanel h2 {
            font-size: 38px;
          }

          .videoCard video {
            height: 240px;
          }

          .twoColumnHeading {
            grid-template-columns: 1fr;
            gap: 45px;
          }

          .experienceHeading {
            text-align: left;
          }

          .experienceHeading p {
            margin-left: 0;
          }

          .roomsGrid {
            grid-template-columns: 1fr;
          }

          .experienceGrid {
            grid-template-columns: 1fr;
          }

          .roomImage {
            height: 240px;
          }

          .foodSection {
            grid-template-columns: 1fr;
          }

          .foodText {
            padding: 55px 25px;
          }

          .amenities {
            padding: 55px 25px;
          }

          .amenityGrid {
            grid-template-columns: repeat(2, 1fr);
          }

          .galleryLayout {
            grid-template-columns: 1fr;
            gap: 25px;
          }

          .galleryIntro p {
            max-width: 500px;
          }

          .galleryTrack {
            gap: 7px;
          }

          .galleryItem {
            min-width: 76%;
            height: 220px;
          }

          .galleryItem:not(.galleryActive) {
            opacity: 0.35;
          }

          .locationSection {
            grid-template-columns: 1fr;
          }

          .locationIntro,
          .contactPanel {
            padding: 50px 25px;
          }

          .mapArea,
          .mapArea iframe {
            min-height: 320px;
          }

          .footer {
            padding-top: 45px;
          }

          .footerGrid {
            grid-template-columns: 1fr 1fr;
            gap: 35px 20px;
          }

          .footerBrand {
            grid-column: 1 / -1;
          }

          .footerBottom {
            width: calc(100% - 32px);
          }

          .floatingButtons {
            right: 13px;
            bottom: 13px;
          }

          .floatingButtons a {
            width: 44px;
            height: 44px;
          }
        }
          /* =========================================
   FINAL DESKTOP OVERRIDE — ROOMS + EXPERIENCES
   ========================================= */

@media (min-width: 641px) {
  .stayBlock {
    width: 100%;
    margin-bottom: 80px;
  }

  .stayHeading {
    margin-bottom: 35px;
  }

  .roomsGrid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 22px !important;
    width: 100%;
  }

  .roomCard {
    width: 100%;
    min-width: 0;
  }

  .roomImage {
    position: relative;
    width: 100%;
    height: 260px !important;
    overflow: hidden;
  }

  .roomImage img {
    display: block;
    width: 100%;
    height: 100% !important;
    object-fit: cover;
  }

  .experienceBlock {
    width: 100%;
    margin-top: 20px;
    padding-top: 0;
    border-top: 0;
  }

  .experienceHeading {
    text-align: center;
    margin-bottom: 35px;
  }

  .experienceHeading p {
    margin-left: auto;
    margin-right: auto;
  }

  .experienceGrid {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    gap: 15px;
  }
}
  /* FINAL DESKTOP WORK PACKAGE LAYOUT */
@media (min-width: 641px) {
  .workPackagesGrid {
    display: grid !important;
    grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
    grid-auto-flow: row !important;
    gap: 18px !important;
    width: 100% !important;
  }

  .workPackageCard {
    display: flex !important;
    flex-direction: column !important;
    width: 100% !important;
    min-width: 0 !important;
    height: auto !important;
    padding: 22px 20px 18px !important;
  }

  .packageDescription {
    min-height: 44px;
  }

  .packageIncludes {
    display: flex !important;
    flex-direction: column !important;
    flex-wrap: nowrap !important;
    padding: 12px 0 !important;
    margin-top: 10px !important;
    gap: 7px !important;
  }

  .packageBottom {
    display: flex !important;
    margin-top: auto !important;
    padding-top: 12px !important;
    justify-content: space-between !important;
    align-items: flex-end !important;
  }

  .packagePrice {
    width: auto !important;
    text-align: left !important;
    align-items: flex-start !important;
  }

  .packageBookButton {
    width: auto !important;
  }
}
  
      `}</style>
    </main>
  );
}
