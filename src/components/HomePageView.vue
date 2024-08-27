<!-- view-source:https://getbootstrap.com/docs/5.3/examples/blog/# -->
<!-- https://getbootstrap.com/docs/5.3/examples/blog/# -->
<!-- https://getbootstrap.com/docs/5.3/examples/carousel/ -->
<!-- view-source:https://getbootstrap.com/docs/5.3/examples/carousel/ -->
<template>
  <div id="myCarousel" class="carousel slide mb-6" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="https://images.unsplash.com/photo-1490567674331-72de84794694?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxNTA2OTcyfHxlbnwwfHx8fHw%3D"
          class="d-block w-100"
          alt="First slide"
        />
        <div class="container">
          <div class="carousel-caption text-start">
            <h1 class="text-dark">Community Social Event</h1>
            <p class="text-dark">Dedicate yourself to the community, waiting for you to join</p>
            <p>
              <router-link class="btn btn-lg btn-primary" to="/views/join">Learn more</router-link>
            </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1583609042814-8a30efe7a9d5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wzMTczNjExfHxlbnwwfHx8fHw%3D"
          class="d-block w-100"
          alt="First slide"
        />
        <div class="container">
          <div class="carousel-caption">
            <h1>
              The Psychology of Health and Illness: The Mental Health and Physiological Effects of
              Intimate Partner Violence on Women
            </h1>
            <p>
              <router-link class="btn btn-lg btn-primary" to="/views/Learning"
                >Learn more</router-link
              >
            </p>
          </div>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwzNDkzMTYzfHxlbnwwfHx8fHw%3D"
          class="d-block w-100"
          alt="First slide"
        />
        <div class="container">
          <div class="carousel-caption text-end">
            <h1>Your kindness is a blessing to the world</h1>
            <p>Become a volunteer and contribute your strength</p>
            <p>
              <router-link class="btn btn-lg btn-primary" to="/views/join">Apply</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#myCarousel"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <br />
  <div class="row mb-2">
    <div class="col-md-6">
      <div
        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-primary-emphasis">World</strong>
          <h3 class="mb-0">Featured post</h3>
          <div class="mb-1 text-body-secondary">Nov 12</div>
          <p class="card-text mb-auto">
            This is a wider card with supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg class="bi"><use xlink:href="#chevron-right" /></svg>
          </a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg
            class="bd-placeholder-img"
            width="200"
            height="250"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
          </svg>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div
        class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
      >
        <div class="col p-4 d-flex flex-column position-static">
          <strong class="d-inline-block mb-2 text-success-emphasis">Design</strong>
          <h3 class="mb-0">Post title</h3>
          <div class="mb-1 text-body-secondary">Nov 11</div>
          <p class="mb-auto">
            This is a wider card with supporting text below as a natural lead-in to additional
            content.
          </p>
          <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
            Continue reading
            <svg class="bi"><use xlink:href="#chevron-right" /></svg>
          </a>
        </div>
        <div class="col-auto d-none d-lg-block">
          <svg
            class="bd-placeholder-img"
            width="200"
            height="250"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Placeholder: Thumbnail"
            preserveAspectRatio="xMidYMid slice"
            focusable="false"
          >
            <title>Placeholder</title>
            <rect width="100%" height="100%" fill="#55595c" />
            <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.carousel-item {
  height: 800px;
}

.carousel-item img {
  object-fit: cover;
  height: 100%;
}
</style>
