import { Link } from 'react-router-dom';
import { Icons } from '../ui/icons';
import { footerMenuItems } from '@/constants/data';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white">
      <div className="">
        <div className="flex flex-col items-center gap-10 px-32 py-8 xl:px-64">
          <div className="flex w-full max-w-5xl items-center justify-between">
            <div className="flex flex-col items-center gap-3">
              <div className="flex flex-col justify-between gap-8">
                <div className="flex flex-col gap-3 font-normal">
                  {footerMenuItems.map((item, index) => (
                    <Link key={index} to={item.href} className="block">
                      {item.title.trim()}
                    </Link>
                  ))}
                </div>
                <div className="text-xl font-normal opacity-50">
                  © 2024 S-Contract
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-lg">Thông tin liên lạc</h3>
              <div className="font-normal">
                <ul className="flex flex-col gap-3">
                  <li className="flex items-center">
                    <Icons.mapPin className="mr-2 size-5" /> Địa chỉ : 1234 Thủ
                    Đức
                  </li>
                  <li className="flex items-center">
                    <Icons.phone className="mr-2 size-5" /> Số điện thoại : 8888
                    8888
                  </li>
                  <li className="flex items-center">
                    <Icons.mail className="mr-2 size-5" /> Email:
                    example@s.contract.com
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
