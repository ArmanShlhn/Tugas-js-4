function submitForm(event) {
    event.preventDefault();

    let nama = document.getElementById("nama").value;
    let jabatan = document.getElementById("jabatan").value;
    let status = document.getElementById("status").value;

    let gajiPokok = GajiPokok(jabatan);

    tambahDataPegawai(nama, jabatan, gajiPokok, status);

    document.getElementById("nama").value = "";
    document.getElementById("jabatan").value = "";
    document.getElementById("status").value = "";
}

function GajiPokok(jabatan) {
    let gajiPokok;
    if (jabatan === "Manager") {
        gajiPokok = 15000000;
    } else if (jabatan === "Asisten") {
        gajiPokok = 10000000;
    } else if (jabatan === "Staff") {
        gajiPokok = 5000000;
    }
    return gajiPokok;
}

function TunjanganJabatan(gajiPokok) {
    return 0.15 * gajiPokok;
}

function BPJS(gajiPokok) {
    return 0.10 * gajiPokok;
}

function TunjanganKeluarga(gajiPokok, status) {
    return status === "Menikah" ? 0.20 * gajiPokok : 0;
}

function tambahDataPegawai(nama, jabatan, gaji, status) {

    let tunjanganJabatan = TunjanganJabatan(gaji);
    let bpjs = BPJS(gaji);
    let tunjanganKeluarga = TunjanganKeluarga(gaji, status);
    let totalGaji = gaji + tunjanganJabatan + tunjanganKeluarga - bpjs;
    
    Swal.fire({
        title: "Data Pegawai",
        text: "Data Pegawai",
        icon: "success",
        html: `
        <div class='justify-content-center'>
        <table border='1' class='table-width'>
            <thead>
                <tr>
                    <td>Nama</td>
                    <td>${nama}</td>
                </tr>
                <tr>
                    <td>Jabatan</td>
                    <td>${jabatan}</td>
                </tr>
                <tr>
                    <td>Status</td>
                    <td>${status}</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Gaji Pokok</td>
                    <td colspan="2">${gaji}</td>
                </tr>
                <tr>
                    <td>Tunjangan Jabatan</td>
                    <td colspan="2">${tunjanganJabatan}</td>
                </tr>
                <tr>
                    <td>Tunjangan Keluarga</td>
                    <td colspan="2">${tunjanganKeluarga}</td>
                </tr>
                <tr>
                    <td>BPJS</td>
                    <td colspan="2">${bpjs}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <th>Jumlah</th>
                    <td colspan="2">${totalGaji}</td>
                </tr>
            </tfoot>
        </table>
        </div>
        `
    });
}
