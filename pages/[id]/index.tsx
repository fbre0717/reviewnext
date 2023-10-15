import { useRouter } from "next/router";
import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

export default function UserIndex({ user }) {
  const router = useRouter();
  const id = router.query.id as string;
  
  var source = encodeURIComponent(user.id);

  return (
    <>
      <title>{user.name}</title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={`https://yena-first.s3.ap-northeast-2.amazonaws.com/${source}.jpg`}
          width={150}
          height={150}
          alt={user.name}
        />
        <h1>{user.name}</h1>
        <h1>{id}</h1>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const users = [
    {
      id: "yena.jigumina",
      name: "Yena",
    },
    {
      id: "_chaechae_1",
      name: "Chaewon",
    },
    {
      id: "imwinter",
      name: "Winter",
    },
    {
      id: "zo__glasss",
      name: "Yuri",
    },
  ];

  // 현재 페이지의 id와 일치하는 사용자를 찾음
  const user = users.find((u) => u.id === context.params.id);

  return {
    props: { user }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: "yena.jigumina" } },
      { params: { id: "_chaechae_1" } },
      { params: { id: "imwinter" } },
      { params: { id: "zo__glasss" } },
    ],
    fallback: false,
  };
};

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {
//       id: "1",
//       title: "first",
//     },
//   };
// };

// 예시 2
// return {
//   paths: [
//     {
//       params: {
//         id: "1",
//         title: "first post"
//       }
//     },
//     {
//       params: {
//         id: "2",
//         title: "second post"
//       }
//     }
//   ]
//   // pages/posts/[id]/[title].tsx라고 가정
//   // pages/posts/1/first post와 pages/posts/2/second post/를 static으로 생성
// }
