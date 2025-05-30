import { useNavigate } from 'react-router-dom';
import logo from '../../favicon.png';
import { useEffect } from 'react';

// Định nghĩa các ngôn ngữ được hỗ trợ
const languages = [
  {
    code: 'vi',
    name: 'Tiếng Việt',
    flag: '/assets/images/vietnam.png',
    country: 'Việt Nam'
  },
  {
    code: 'en-US',
    name: 'English (US)',
    flag: '/assets/images/united-states.png',
    country: 'United States'
  },
  {
    code: 'en-AU',
    name: 'English (AU)',
    flag: '/assets/images/australia.png',
    country: 'Australia'
  }
];

export function LanguageSelection() {
  const navigate = useNavigate();
  
  // Kiểm tra localStorage khi component được mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      // Nếu đã có ngôn ngữ được lưu, chuyển hướng đến trang đăng nhập
      navigate('/login');
    }
  }, [navigate]);
  
  const selectLanguage = (langCode: string) => {
    // Lưu ngôn ngữ được chọn vào localStorage
    localStorage.setItem('selectedLanguage', langCode);
    // Chuyển hướng đến trang đăng nhập
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className=" w-full flex flex-col items-center px-4 xl:px-0">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-blue-500 rounded-lg p-3 mb-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-blue-600 mb-1">mi<span className="text-blue-600">trade</span></h1>
          <p className="text-gray-500 text-sm">Professional transaction management system</p>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 mb-4">Choose your country</h2>
        
        <div className="flex justify-center gap-2 xl:gap-4 w-fit xl:w-full">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => selectLanguage(lang.code)}
              className="flex flex-col items-center justify-center p-1.5 xl:p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex flex-col gap-3 items-center justify-center">
                <img src={lang.flag} alt={lang.country} className="w-28 xl:w-40 aspect-[3/2] object-cover rounded-lg" />
                <span className="font-medium text-sm xl:text-base whitespace-nowrap">{lang.country}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LanguageSelection; 