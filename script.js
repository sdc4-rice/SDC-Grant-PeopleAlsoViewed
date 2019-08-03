import http from "k6/http";
import { check, sleep } from "k6";


export let options = {
  rps: 20000,
  duration: "60s"

};

export default function() {
  let res = http.get("http://localhost:3004/api/alsovieweditems/categoryid/9999996");
  check(res, {
    "status was 200": (r) => r.status == 200
  });
};