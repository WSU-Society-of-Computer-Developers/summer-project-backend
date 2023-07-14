# 2023 SCD Summer Project Backend

The summer project aims to engage students in creating and deploying a web-based application within a two-month time frame. Students will work collaboratively in teams, taking on different roles and responsibilities to incrementally develop the application from start to finish, using the Agile methodology.

<details>
<summary>Description</summary>
The summer project aims to engage students in creating and deploying a web-based application within a two-month time frame. Students will work collaboratively in teams, taking on different roles and responsibilities to incrementally develop the application from start to finish, using the Agile methodology.

Throughout the project, students will gain hands-on experience in web development, enhancing their programming skills and expanding their technical knowledge. They will have the opportunity to work on frontend and/or backend development, database management, system (architecture) design, CI/CD pipelines, and also non-technical roles such as management, marketing, branding, and QA/UX. The project also focuses on fostering teamwork, collaboration, and project management skills as students work together to overcome challenges and meet project milestones.

By participating in this summer project, students will have the chance to build their portfolios and resumes with a real-world web application, showcasing their practical skills and commitment to learning ubiquitous and intricate systems. They will also benefit from networking opportunities, connecting with peers, mentors, and faculty involved in the project. Additionally, the project will provide students with exposure to industry practices and development methodologies, preparing them for future careers in related fields.

It may seem a bit overwhelming to realize what you're getting yourself into, but don't worry! You don't have to be fully committed to join. The goal of this project is to provide you with a valuable learning experience, skill development, personal growth, and the opportunity to work communally on a meaningful project that can have a lasting impact on your academic and professional journeys.
<br>

</details>

## Tooling

This project uses tools like:

- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org)
- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/ladjs/supertest)
- [Pocketbase SDK](https://github.com/pocketbase/js-sdk)

## Getting Started

<details>
<summary>Setup</summary>
<br>

1. Clone the repository

```bash
# clone repo
git clone https://github.com/WSU-Society-of-Computer-Developers/summer-project=backend
# go to project folder
cd summer-project-backend
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
# .env
PORT=5000
REDIS_URL=redis_urL
PB_URL=pocketbase_url
NODE_ENV=development
```

4. Start redis server

```bash
docker run -d --name redis-stack -p 6379:6379 -p 8001:8001 redis/redis-stack:latest
```

5. Start Pocketbase docker stack _(optional)_

```yaml
version: "3.7"
services:
  pocketbase:
    image: ghcr.io/muchobien/pocketbase:latest
    container_name: pocketbase
    restart: always
    command:
      - --encryptionEnv #optional
      - ENCRYPTION #optional
    environment:
      ENCRYPTION: example #optional
    ports:
      - "8090:8090"
    volumes:
      - ./data/data:/pb_data
      - ./data/public:/pb_public #optional
    healthcheck: #optional (recommended) since v0.10.0
      test: wget --no-verbose --tries=1 --spider http://localhost:8090/api/health || exit 1
      interval: 5s
      timeout: 5s
      retries: 5
```

6. Run the dev environment

```bash
# run this command everytime you want to start the dev server
npm run dev
```

Now the site should be up @ <http://localhost:5000>.
