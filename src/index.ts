import { initServer } from "@/app/index"

async function init() {
    const app = await initServer();
    app.listen(8080, ()=>console.log("App listening on PORT-8080"))
}
init()