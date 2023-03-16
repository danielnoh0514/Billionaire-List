import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/Home.module.css";
import { useQuery } from "react-query";
import { getBillionaires } from "@/api";
import Link from "next/link";
import { Router } from "next/router";

export interface IBill {
  id: string;
  name: string;
  squareImage: string;
  netWorth: number;
  industries: string[];
}

export default function Home() {
  const { data } = useQuery<IBill[]>(["bill", 1], getBillionaires);
  console.log(data);

  return (
    <div>
      <div className={styles.title}>
        <h1>Top 50 Billonaires</h1>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.pictures}>
          {data?.slice(0, 50).map((billionaires) => (
            <div key={billionaires.id}>
              <Link
                href={{
                  pathname: `/person/${billionaires.id}`,
                  query: {
                    id: billionaires.id,
                    netWorth: Math.ceil(billionaires.netWorth / 1000),
                    industry: billionaires.industries,
                    picture: billionaires.squareImage,
                    name: billionaires.name,
                  },
                }}
                as={`/person/${billionaires.id}`}
              >
                <img
                  className={styles.img}
                  src={billionaires.squareImage}
                ></img>
              </Link>
              <div style={{ marginBottom: 10 }}>
                <span className={styles.info}>{billionaires.name}</span>
              </div>
              <span className={styles.info}>
                {Math.ceil(billionaires.netWorth / 1000)} Billion /{" "}
              </span>
              <span className={styles.info}>{billionaires.industries}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
