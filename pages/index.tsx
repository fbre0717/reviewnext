import Image from "next/image";

export default function Upload() {
  // 추가할만한 기능 : 사진을 업로드 하면, 기본 이미지에서 방금 올린 이미지로 대체되도록 한다.
  // useEffect와 useState 적당히 사용하면 가능할 것 같다.
  return (
    <>
      <title>♥예나단장♥</title>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>♥예나단장♥</h1>
        <Image
          src={
            "https://" +
            process.env.NEXT_PUBLIC_BUCKET_NAME +
            ".s3." +
            process.env.NEXT_PUBLIC_AWS_REGION +
            ".amazonaws.com/%EC%98%88%EB%82%98%EB%B2%A0%EB%A0%88%EB%AA%A8.jpg"
          }
          width={432}
          height={432}
        />
        <br></br>
        <div style={{ border: "1px solid black", padding: "10px" }}>
          <p>100MB까지 가능합니다</p>
          <input
            onChange={uploadPhoto}
            type="file"
            accept="image/png, image/jpeg"
          />
        </div>
        <div>
          <br></br>
          <br></br>
        </div>
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
