"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "../../components/Card"
import { Avatar } from "../../components/Avatar"
import Link from "next/link"
import styles from "./about.module.css"

export default function AboutPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backHomeButton}>
        Back to Home
      </Link>
      <h1 className={styles.pageTitle}>About BellyBudget</h1>
      <p className={styles.pageSubtitle}>Empowering you to make smarter food choices and save money</p>

      <div className={styles.cardGrid}>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <h2>Our Mission</h2>
            <p>
              At BellyBudget, we're passionate about helping people balance their love for food with their financial
              goals. Our app is designed to make meal planning, grocery shopping, and budget tracking seamless and
              enjoyable.
            </p>
          </CardContent>
        </Card>
        <Card className={styles.card}>
          <CardContent className={styles.cardContent}>
            <h2>Our Vision</h2>
            <p>
              We envision a world where everyone can enjoy delicious, nutritious meals without breaking the bank.
              BellyBudget is our contribution to making this vision a reality, one meal at a time.
            </p>
          </CardContent>
        </Card>
      </div>

      <h2 className={styles.teamTitle}>Meet Our Team</h2>
      <div className={styles.teamGrid}>
        {teamMembers.map((member, index) => (
          <Card
            key={member.name}
            className={`${styles.card} ${mounted ? styles.fadeIn : ""}`}
            style={{ animationDelay: `${0.8 + index * 0.2}s` }}
          >
            <CardContent className={styles.cardContent}>
              <Avatar src={member.avatar} alt={member.name} className={styles.avatar} />
              <h3>{member.name}</h3>
              <p className={styles.memberRole}>{member.role}</p>
              <p className={styles.memberBio}>{member.bio}</p>
              <div className={styles.socialLinks}>
                <Link href={member.github} target="_blank" rel="noopener noreferrer">
                  GitHub
                </Link>
                <Link href={member.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </Link>
                <Link href={`mailto:${member.email}`}>Email</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

const teamMembers = [
  {
    name: "Joseph Cheng",
    role: "Computer Science and Math Sophomore at NYU",
    bio: "Joseph is passionate about creating intuitive user experiences and optimizing backend performance.",
    avatar: "/placeholder.svg?height=100&width=100",
    github: "https://github.com/jxc2008",
    linkedin: "https://www.linkedin.com/in/joseph-cheng-b03886296/",
    email: "joseph.x.cheng@gmail.com",
  },
  {
    name: "Kevin Dong",
    role: "Computer Science and Math Sophomore at NYU",
    bio: "Kevin brings creativity and problem-solving skills to make BellyBudget both efficient and user-friendly.",
    avatar: "/placeholder.svg?height=100&width=100",
    github: "https://github.com/kevinlindong",
    linkedin: "https://www.linkedin.com/in/kevinlindong/",
    email: "kevindong@nyu.edu",
  },
  {
    name: "Eshaan Saxena",
    role: "Computer Science and Math Sophomore at NYU",
    bio: "Eshaan leverages his analytical skills to provide innovative solutions and enhance user experience.",
    avatar: "/placeholder.svg?height=100&width=100",
    github: "https://github.com/seaking117",
    linkedin: "https://www.linkedin.com/in/eshaan-saxena/",
    email: "eshaan.saxena117@gmail.com",
  },
  {
    name: "Ritvik Rallapalli",
    role: "Computer Science and Math Sophomore at NYU",
    bio: "Ritvik ensures that BellyBudget continues to evolve to meet our users' needs and exceed their expectations.",
    avatar: "/placeholder.svg?height=100&width=100",
    github: "https://github.com/ritvikra",
    linkedin: "https://www.linkedin.com/in/ritvikrallapalli/",
    email: "ritvikrallapalli@gmail.com",
  },
]

