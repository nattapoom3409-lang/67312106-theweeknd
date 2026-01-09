import React, { useState, useRef } from "react";
import Navbar from "./Navbar";
import "./TheWeeknd.css";
import AboutMe from "./AboutMe";

const TheWeeknd = () => {
  const [activeIndex, setActiveIndex] = useState(9);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const ALBUM_COUNT = 10;

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchActive = useRef(false);
  const animationRef = useRef(null);
  const FRAME_DURATION = 150;

  const albums = [
    {
      id: 1,
      title: "House of Balloons",
      year: "2011 (Mixtape)",
      img: "./img/1.png",
      tracks: [
        "High for This",
        "What You Need",
        "House of Balloons / Glass Table Girls",
        "The Morning",
        "Wicked Games",
        "The Party & The After Party",
        "Coming Down",
        "Loft Music",
        "The Knowing",
      ],
    },
    {
      id: 2,
      title: "Thursday",
      year: "2011 (Mixtape)",
      img: "./img/2.png",
      tracks: [
        "Lonely Star",
        "Life of the Party",
        "Thursday",
        "The Zone",
        "The Birds Pt. 1",
        "The Birds Pt. 2",
        "Gone",
        "Rolling Stone",
        "Heaven or Las Vegas",
      ],
    },
    {
      id: 3,
      title: "Echoes of Silence",
      year: "2011 (Mixtape)",
      img: "./img/3.png",
      tracks: [
        "D.D.",
        "Montreal",
        "Outside",
        "XO / The Host",
        "Initiation",
        "Same Old Song",
        "The Fall",
        "Next",
        "Echoes of Silence",
      ],
    },
    {
      id: 4,
      title: "Kiss Land",
      year: "2013",
      img: "./img/4.png",
      tracks: [
        "Professional",
        "The Town",
        "Adaptation",
        "Love in the Sky",
        "Belong to the World",
        "Live For",
        "Wanderlust",
        "Kiss Land",
        "Pretty",
        "Tears in the Rain",
      ],
    },
    {
      id: 5,
      title: "Beauty Behind the Madness",
      year: "2015",
      img: "./img/5.png",
      tracks: [
        "Real Life",
        "Losers",
        "Tell Your Friends",
        "Often",
        "The Hills",
        "Acquainted",
        "Can't Feel My Face",
        "Shameless",
        "Earned It",
        "In the Night",
        "As You Are",
        "Dark Times",
        "Prisoner",
        "Angel",
      ],
    },
    {
      id: 6,
      title: "Starboy",
      year: "2016",
      img: "./img/6.png",
      tracks: [
        "Starboy",
        "Party Monster",
        "False Alarm",
        "Reminder",
        "Rockin'",
        "Secrets",
        "True Colors",
        "Stargirl Interlude",
        "Sidewalks",
        "Six Feet Under",
        "Love to Lay",
        "A Lonely Night",
        "Attention",
        "Ordinary Life",
        "Nothing Without You",
        "All I Know",
        "Die for You",
        "I Feel It Coming",
      ],
    },
    {
      id: 7,
      title: "My Dear Melancholy,",
      year: "2018 (EP)",
      img: "./img/7.png",
      tracks: [
        "Call Out My Name",
        "Try Me",
        "Wasted Times",
        "I Was Never There",
        "Hurt You",
        "Privilege",
      ],
    },
    {
      id: 8,
      title: "After Hours",
      year: "2020",
      img: "./img/8.png",
      tracks: [
        "Alone Again",
        "Too Late",
        "Hardest to Love",
        "Scared to Live",
        "Snowchild",
        "Escape from LA",
        "Heartless",
        "Faith",
        "Blinding Lights",
        "In Your Eyes",
        "Save Your Tears",
        "Repeat After Me",
        "After Hours",
        "Until I Bleed Out",
      ],
    },
    {
      id: 9,
      title: "Dawn FM",
      year: "2022",
      img: "./img/9.png",
      tracks: [
        "Dawn FM",
        "Gasoline",
        "How Do I Make You Love Me?",
        "Take My Breath",
        "Sacrifice",
        "A Tale by Quincy",
        "Out of Time",
        "Here We Go... Again",
        "Best Friends",
        "Is There Someone Else?",
        "Starry Eyes",
        "Every Angel is Terrifying",
        "Don't Break My Heart",
        "I Heard You're Married",
        "Less Than Zero",
        "Phantom Regret by Jim",
      ],
    },
    {
      id: 10,
      title: "Hurry Up Tomorrow",
      year: "2025 ",
      img: "./img/10.png",
      tracks: [
        "Wake Me Up",
        "Cry For Me",
        "I Can't Fucking Sing",
        "Sao Paulo",
        "Until We're Sking & Bones",
        "Baptized In Fear",
        "Open Hearts",
        "Opening Night",
        "Reflections Laughing",
        "Enjoy The Show",
        "Given Up On Me",
        "I Can't Wait To Get There",
        "Timeless",
        "Niagara Falls",
        "Take Me Back to LA ",
        "Big Sleep",
        "Give Me Mercy",
        "Drive",
        "The Abyss",
        "Red Terror",
        "Without Warning",
        "Hurry Up Tomorrow",
      ],
    },
  ];

  const getClassNameAndZIndex = (index) => {
    let diff = index - activeIndex;
    if (diff > ALBUM_COUNT / 2 - 1) diff -= ALBUM_COUNT;
    else if (diff < -ALBUM_COUNT / 2) diff += ALBUM_COUNT;

    if (diff === 0) return { className: "album-card active", zIndex: 10 };
    if (diff === 1) return { className: "album-card next-1", zIndex: 9 };
    if (diff === -1) return { className: "album-card prev-1", zIndex: 9 };
    if (diff === 2) return { className: "album-card next-2", zIndex: 8 };
    if (diff === -2) return { className: "album-card prev-2", zIndex: 8 };
    return {
      className: diff > 0 ? "album-card next-far" : "album-card prev-far",
      zIndex: 1,
    };
  };

  const getNextIndex = (current, dir) => {
    let next = current + dir;
    if (next >= ALBUM_COUNT) return 0;
    if (next < 0) return ALBUM_COUNT - 1;
    return next;
  };

  const handleClickCardOrDot = (targetIndex) => {
    if (targetIndex === activeIndex) return;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    let currentIndex = activeIndex;
    let diff = targetIndex - currentIndex;
    if (diff > ALBUM_COUNT / 2) diff -= ALBUM_COUNT;
    if (diff < -ALBUM_COUNT / 2) diff += ALBUM_COUNT;
    const direction = Math.sign(diff);

    let startTime;
    const animateStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (currentIndex === targetIndex) {
        setActiveIndex(targetIndex);
        animationRef.current = null;
        return;
      }

      if (elapsed > FRAME_DURATION) {
        const nextIndex = getNextIndex(currentIndex, direction);
        setActiveIndex(nextIndex);
        currentIndex = nextIndex;
        startTime = timestamp;
      }

      animationRef.current = requestAnimationFrame(animateStep);
    };

    animationRef.current = requestAnimationFrame(animateStep);
  };

  const handleExpandCard = (album) => {
    setSelectedAlbum(album);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setSelectedAlbum(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div>
      <Navbar/>
      <AboutMe/>

      <div className="container">
        <div className="Page Home" id="Home">
          <h1>The Weeknd</h1>
          <h2>Abel Tesfaye</h2>
        </div>

        <div className="Page Biography" id="Biography">
          <section className="Biography-section">
            <h1>Biography</h1>
            <p className="paragraph text">
              The Weeknd is the stage name of Abel Makkonen Tesfaye, born
              February 16, 1990, in Toronto, Canada. He is one of the most
              influential artists of modern R&B and pop, known for his dark,
              atmospheric sound, emotional lyrics, and cinematic visuals.
            </p>
            <h2>Early Life</h2>
            <p className="paragraph text">
              Abel was raised in Toronto’s Scarborough district by his mother
              and grandmother after his parents separated. He is of Ethiopian
              descent and grew up speaking Amharic at home. As a teenager, he
              dropped out of high school and experienced periods of
              homelessness, which later heavily influenced the themes of
              loneliness, excess, and self-destruction in his music.
            </p>

            <h2>2009–2014: Trilogy and Kiss Land</h2>
            <p>
              This era marked his transition from an anonymous internet
              sensation to a major-label artist.
            </p>
            <ul className="text">
              <li>
                The Mixtapes: In 2011, he released three influential
                mixtapes—House of Balloons, Thursday, and Echoes of
                Silence—which were later compiled into the 2012 album Trilogy.
              </li>
              <li>
                Debut Album: In 2013, he released his debut studio album, Kiss
                Land, which debuted at number two on the Billboard 200.
              </li>
              <li>
                Mainstream Breakthrough: During this time, he began
                collaborating with Drake and contributed to soundtracks like The
                Hunger Games: Catching Fire and Fifty Shades of Grey (the hit
                "Earned It").
              </li>
            </ul>

            <h2>2015–2016: Beauty Behind the Madness</h2>
            <p>
              Tesfaye moved from "alternative R&B" into global pop superstardom.
            </p>
            <ul className="text">
              <li>
                Chart Dominance: This era produced massive #1 hits including
                "The Hills" and "Can't Feel My Face." * Accolades: The album
                Beauty Behind the Madness won a Grammy for Best Urban
                Contemporary Album, and he became the first artist to
                simultaneously hold the top three slots on the Billboard Hot R&B
                Songs chart.
              </li>
            </ul>

            <h2>2016–2019: Starboy and My Dear Melancholy</h2>
            <p>
              This phase saw a stylistic shift toward "80s-inspired synth-pop
              and a return to darker roots.
            </p>
            <ul className="text">
              <li>
                Starboy: He cut his signature hair and released Starboy (2016),
                featuring the Daft Punk-assisted title track and "I Feel It
                Coming."
              </li>
              <li>
                My Dear Melancholy: In 2018, he released a shorter EP that
                returned to the moodier, more melancholic sound of his early
                mixtapes, led by the single "Call Out My Name."
              </li>
            </ul>

            <h2>2019–2021: After Hours and Super Bowl LV halftime show</h2>
            <p>
              Widely considered a career peak, this era was defined by a
              cinematic, red-suit-wearing persona.
            </p>
            <ul className="text">
              <li>
                After Hours: Released in 2020, it featured the record-breaking
                global hit "Blinding Lights" (the most-streamed song in Spotify
                history).
              </li>
              <li>
                Super Bowl: The era culminated in his headlining performance at
                the Super Bowl LV halftime show in February 2021.
              </li>
            </ul>

            <h2>2021–2023: Dawn FM</h2>
            <p>
              Tesfaye followed up his massive success with a conceptual
              "purgatory" radio station theme.
            </p>
            <ul className="text">
              <li>
                Dawn FM: Released in early 2022, this synth-heavy album was
                narrated by Jim Carrey and featured hits like "Take My Breath"
                and "Sacrifice."
              </li>
              <li>
                Stadium Tour: He embarked on the After Hours til Dawn global
                stadium tour, which broke records for the highest-grossing R&B
                tour.
              </li>
            </ul>

            <h2>2023–present: The Idol and Hurry Up Tomorrow</h2>
            <p>
              This current phase focuses on his expansion into acting and the
              conclusion of his latest musical trilogy.
            </p>
            <ul className="text">
              <li>
                The Idol: He co-created and starred in the HBO series The Idol,
                contributing heavily to its soundtrack.
              </li>
              <li>
                Hurry Up Tomorrow: He is currently preparing to release Hurry Up
                Tomorrow, which he has teased as the final installment of the
                trilogy that began with After Hours and Dawn FM, and potentially
                his final album under the name "The Weeknd."
              </li>
            </ul>
          </section>
        </div>

        <div className="Page Discography"
          id="Discography"
          onTouchStart={(e) => {
            touchActive.current = true;
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchMove={(e) => {
            if (touchActive.current) touchEndX.current = e.touches[0].clientX;
          }}
          onTouchEnd={() => {
            if (!touchActive.current) return;
            const diffX = touchStartX.current - touchEndX.current;
            if (Math.abs(diffX) > 50)
              handleClickCardOrDot(
                getNextIndex(activeIndex, diffX > 0 ? 1 : -1)
              );
            touchActive.current = false;
          }}
        >
          <div className="album">
            {albums.map((album, index) => {
              const { className, zIndex } = getClassNameAndZIndex(index);
              const isActive = className.includes("active");
              const isSide =
                className.includes("next-1") || className.includes("prev-1");

              return (
                <div
                  key={album.id}
                  className={className}
                  style={{ zIndex }}
                  onClick={
                    isSide ? () => handleClickCardOrDot(index) : undefined
                  }
                >
                  <img
                    src={album.img}
                    alt={album.title}
                    loading="lazy"
                    style={{
                      cursor: isActive ? "pointer" : "default",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                    onClick={() => handleExpandCard(album)}
                  />

                  <h1>{album.title}</h1>
                  <p className="release-year">{album.year}</p>
                </div>
              );
            })}
          </div>

          <div className="dots">
            {albums.map((_, index) => (
              <label
                key={index}
                className={index === activeIndex ? "active" : ""}
                onClick={() => handleClickCardOrDot(index)}
              />
            ))}
          </div>
        </div>
        <div className="Page Gallery" id="Gallery">
          <div className="carousel">
            <div className="carousel-track">
              <div className="carousel-group">
                <div className="carousel-card">
                  <img src="./img/gallery/g1.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g2.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g3.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g4.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g5.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g6.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g7.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g8.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g9.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g10.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img
                    src="./img/gallery/the-weeknd-tongue.gif"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div className="carousel-card">
                  <img
                    src="./img/gallery/the-weeknd-meme-1.png"
                    alt=""
                    draggable="false"
                  />
                </div>
              </div>

              <div className="carousel-group" aria-hidden="true">
                <div className="carousel-card">
                  <img src="./img/gallery/g1.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g2.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g3.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g4.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g5.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g6.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g7.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g8.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g9.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img src="./img/gallery/g10.png" alt="" draggable="false" />
                </div>
                <div className="carousel-card">
                  <img
                    src="./img/gallery/the-weeknd-tongue.gif"
                    alt=""
                    draggable="false"
                  />
                </div>
                <div className="carousel-card">
                  <img
                    src="./img/gallery/the-weeknd-meme-1.png"
                    alt=""
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="Page SocialMedia" id="SocialMedia">
          <div className="container">
            <h1>Social Media</h1>

            <div className="social-grid">
              <a
                href="https://www.facebook.com/theweeknd"
                target="_blank"
                rel="noopener noreferrer"
                className="link-box"
              >
                <img
                  src="./img/icon/Facebook.png"
                  alt=""
                  className="icon"
                  draggable="false"
                />
                <p>Facebook</p>
              </a>
              <a
                href="https://www.instagram.com/theweeknd/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-box"
              >
                <img
                  src="./img/icon/Instagram.png"
                  alt=""
                  className="icon"
                  draggable="false"
                />
                <p>Instagram</p>
              </a>

              <a
                href="https://x.com/theweeknd"
                target="_blank"
                rel="noopener noreferrer"
                className="link-box"
              >
                <img
                  src="./img/icon/X.png"
                  alt=""
                  className="icon"
                  draggable="false"
                />
                <p>Twitter</p>
              </a>

              <a
                href="https://www.tiktok.com/@theweeknd"
                target="_blank"
                rel="noopener noreferrer"
                className="link-box"
              >
                <img
                  src="./img/icon/Tiktok.png"
                  alt=""
                  className="icon"
                  draggable="false"
                />
                <p>TikTok</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      {selectedAlbum && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div
            className="expanded-container"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-btn" onClick={handleCloseModal}>
              &times;
            </button>

            <div className="expanded-left">
              <img src={selectedAlbum.img} alt={selectedAlbum.title} />
              <div className="album-detail">
                <h1>{selectedAlbum.title}</h1>
                <p className="year">{selectedAlbum.year}</p>
              </div>
            </div>

            <div className="expanded-right">
              <h3>Tracklist</h3>
              <div className="track-list">
                {selectedAlbum.tracks.map((track, i) => (
                  <div key={i} className="track-item">
                    <span className="no">{String(i + 1).padStart(2, "0")}</span>
                    <span className="name">{track}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheWeeknd;
