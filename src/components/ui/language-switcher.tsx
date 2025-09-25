import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es-MX', name: 'Español (México)', flag: '🇲🇽' },
  { code: 'bg', name: 'Български', flag: '🇧🇬' },
];

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'minimal';
}

export function LanguageSwitcher({ className, variant = 'default' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  if (variant === 'minimal') {
    return (
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "glass-strong border-glass-border text-foreground hover:bg-glass-strong/80",
              "flex items-center gap-2 px-3 py-2",
              className
            )}
          >
            <span className="text-lg">{currentLanguage.flag}</span>
            <Globe className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="end" 
          className="glass-strong border-glass-border backdrop-blur-xl"
        >
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={cn(
                "flex items-center gap-3 px-3 py-2 cursor-pointer",
                "hover:bg-primary/10 transition-colors",
                i18n.language === language.code && "bg-primary/20 text-primary"
              )}
            >
              <span className="text-lg">{language.flag}</span>
              <span className="font-medium">{language.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "glass-strong border-glass-border text-foreground",
            "hover:bg-glass-strong/80 hover:border-primary/30",
            "flex items-center gap-2 transition-all duration-300",
            className
          )}
        >
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="hidden sm:inline font-medium">{currentLanguage.name}</span>
          <Globe className="h-4 w-4 opacity-70" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="glass-strong border-glass-border backdrop-blur-xl min-w-[200px]"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 cursor-pointer",
              "hover:bg-primary/10 transition-colors rounded-md",
              i18n.language === language.code && "bg-primary/20 text-primary font-medium"
            )}
          >
            <span className="text-xl">{language.flag}</span>
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}