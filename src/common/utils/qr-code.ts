import QRCode from 'qrcode';

export async function generateQRCode(data: string) {
    try {
        return await QRCode.toDataURL(data);
    } catch (error) {
        console.error('Unable to generate QR code', error);
        return;
    }
}
