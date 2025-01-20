import logo1 from "./assets/Logo/4.png";
import logo2 from "./assets/Logo/16.png";

export default function Integritas() {
    return (
        <div class="grid grid-cols-7 gap-4 my-10">
            <div className="col-start-2 col-end-4 flex">
                <div className="flex flex-col my-10">
                    <p className="title">
                    <span className="blue title">ZONA</span>{" "}
                    INTEGRITAS
                    </p>
                    <p className="desc">Predikat ini diberikan kepada kementrian,
                    lembaga dan pemerintah daerah, yang
                    pimpinan dan jajarannya mempunyai niat
                    (komitmen) untuk mewujudkan WBK dan WBBM
                    melalui upaya pencegahan korupsi, reformasi,
                    biokrasi dan peningkatan kualitas pelayanan
                    publik.</p>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <img className="logo" src={logo1} alt=""/>
            </div>
            <div className="flex items-center justify-center col-start-4">
                <img className="logo" src={logo2} alt=""/>
            </div>
            <div className="col-start-5 col-end-7 flex my-10">
                <div className="flex flex-col">
                    <p className="title text-right">
                        REFORMASI{" "}
                        <span className="blue title">BIROKRASI</span>
                    </p>
                    <p className="desc text-right">Langkah perbaikan tata kelola pemerintah, yang
                    merupakan fondasi utama bagi pembangunan
                    nasional. proses ini melibatkan upaya
                    pembaharuan dan perubahan mendasar pada
                    sistem pemerintahan. Berguna mewujudkan
                    prinsip-prinsip tata kelola yang baik (good
                    governance)</p>
                </div>
            </div>
        </div>
    )
}
