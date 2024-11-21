import QRCode from 'qrcode';
import { env } from '../../../config';

export async function generateQRCode(
    data: string,
    options: QRCode.QRCodeToDataURLOptions = { width: env.QR_CODE.width }
) {
    try {
        return await QRCode.toDataURL(data, options);
    } catch (error) {
        console.error('Unable to generate QR code', error);
        return;
    }
}
