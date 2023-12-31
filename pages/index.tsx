import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router';

export default function Upload() {
  const router = useRouter();
  // 추가할만한 기능 : 사진을 업로드 하면, 기본 이미지에서 방금 올린 이미지로 대체되도록 한다.
  // useEffect와 useState 적당히 사용하면 가능할 것 같다.
  // console.log(process.env.MONGODB_URI)
  // console.log(process.env.NEXT_PUBLIC_MONGODB_URI)

  const handleGet = async () => {
    try {
      const res = await fetch(`/api/pets/`, {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }

      const data = await res.json();
      console.log("Successed:", data);
    } catch (error) {
      console.log("Failed");
    }
  };

  return (
    <>
      <title>♥♥</title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src={`https://yena-first.s3.ap-northeast-2.amazonaws.com/%EC%98%88%EB%82%98%EB%B2%A0%EB%A0%88%EB%AA%A8.jpg`}
          width={432}
          height={432}
          alt="베레모"
        />
        <br></br>
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <p>사진을 올려주세요</p>
          <p>100MB까지 가능합니다</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <br></br>
        <div>
          <Link href={`/yena.jigumina`}>
            <h1>최예나</h1>
          </Link>
          <Link href={`/_chaechae_1`}>
            <h1>김채원</h1>
          </Link>
          <Link href={`/imwinter`}>
            <h1>김민정</h1>
          </Link>
          <Link href={`/zo__glasss`}>
            <h1>조유리</h1>
          </Link>
        </div>
        <button onClick={handleGet}>펫목록</button>
        <button onClick={() => console.log("눌러주세요")}>눌러주세요</button>
        <br></br>
        <br></br>
        <button onClick={() => router.push('/sign')}>로그인</button>
      </div>
    </>
  );
}

const uploadPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]!;
  const filename = encodeURIComponent(file.name);
  const fileType = encodeURIComponent(file.type);

  const res = await fetch(
    `/api/upload-url?file=${filename}&fileType=${fileType}`
  );
  const { url, fields } = await res.json();
  const formData = new FormData();

  Object.entries({ ...fields, file }).forEach(([key, value]) => {
    formData.append(key, value as string);
  });

  const upload = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (upload.ok) {
    console.log("Uploaded successfully!");
  } else {
    console.error("Upload failed.");
  }
};
