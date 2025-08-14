import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const WORKER = "https://r2-presign.bambu-catalog.workers.dev";

export async function uploadImg( uri : string, type: string = "image/jpeg") {

      const bytes = await fetch(uri).then(r => r.arrayBuffer());

      const res = await fetch(`${WORKER}/upload?name=${encodeURIComponent(uuidv4())}`, {
        method: "PUT",
        headers: { "Content-Type": type },
        body: bytes,
      });

      const data = await res.json();

      return data.publicUrl;
}