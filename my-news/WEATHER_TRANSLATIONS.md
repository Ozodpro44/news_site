# Weather Condition Translations

Weather descriptions are now automatically translated to Uzbek (Latin) and Uzbek (Cyrillic) based on user language preference.

## Implementation

The translation system is implemented in `src/data/fetchData.ts` with:

- **`WEATHER_TRANSLATIONS`** object: Maps English weather conditions to Uzbek and Uzbek (Cyrillic)
- **`translateWeatherCondition()`** function: Translates condition text based on selected language

## How It Works

### Weather Widget Component
```tsx
import { translateWeatherCondition } from "@/data/fetchData";
import { useTheme } from "@/contexts/ThemeContext";

export const WeatherWidget = ({ data }) => {
  const { language } = useTheme(); // 'uz' or 'kr'
  
  // Translate weather condition
  const translated = translateWeatherCondition(weather.condition, language);
  // Returns translated text in user's language
};
```

## Supported Weather Conditions

### Clear/Sunny
- Sunny → Quyoshli / Қуёшли
- Clear → Tiniq / Тинож
- Partly cloudy → Qisman bulutli / Қисман булутли

### Cloudy
- Cloudy → Bulutli / Булутли
- Overcast → Juda bulutli / Жуда булутли
- Mist → Tumanli / Туманли
- Fog → Tumanli / Туманли
- Freezing fog → Muzligan tumanli / Музлиган туманли

### Rain
- Light rain → Engil yomg'ir / Энгил ёмғир
- Moderate rain → O'rtacha yomg'ir / Ўртача ёмғир
- Heavy rain → Kuchli yomg'ir / Кучли ёмғир
- Freezing rain → Muzligan yomg'ir / Музлиган ёмғир
- Rain with thunder → Chaqnashli yomg'ir / Чақнашли ёмғир

### Snow
- Light snow → Engil qor / Энгил қор
- Moderate snow → O'rtacha qor / Ўртача қор
- Heavy snow → Kuchli qor / Кучли қор
- Blizzard → Qor shamoli / Қор шамоли
- Snow with thunder → Chaqnashli qor / Чақнашли қор

### Sleet
- Sleet → Qor yomg'ir / Қор ёмғир
- Light sleet → Engil qor yomg'ir / Энгил қор ёмғир

### Drizzle
- Light drizzle → Engil tomchila yomg'ir / Энгил томчила ёмғир
- Freezing drizzle → Muzligan tomchila yomg'ir / Музлиган томчила ёмғир

### Possible/Forecast
- Rain possible → Yomg'ir ehtimoli / Ёмғир эҳтимоли
- Snow possible → Qor ehtimoli / Қор эҳтимоли
- Thunder possible → Chaqnash ehtimoli / Чақниш эҳтимоли

## Language Codes

- **uz**: Uzbek (Latin script)
- **kr**: Uzbek (Cyrillic script, sometimes labeled as "қарилик" or "Cyrillic")

## Adding New Translations

To add translations for new weather conditions:

1. Open `src/data/fetchData.ts`
2. Find the `WEATHER_TRANSLATIONS` object
3. Add new entry:

```typescript
'New condition': { 
  uz: 'Uzbek Latin translation', 
  kr: 'Ўзбек кириллица тарджимаси' 
}
```

4. The function will automatically use it for translation

## Fallback Behavior

If a weather condition doesn't have a translation, the original English text is returned. This ensures the app never breaks, even with new weather conditions.

```typescript
function translateWeatherCondition(condition, language = 'uz') {
  return WEATHER_TRANSLATIONS[condition]?.[language] || condition;
  // Returns translated text OR original condition if not found
}
```

## Files Modified

- `src/data/fetchData.ts`:
  - Added `WEATHER_TRANSLATIONS` object
  - Added `translateWeatherCondition()` function
  - Exported translation function

- `src/components/home/WeatherWidget.tsx`:
  - Imported `translateWeatherCondition`
  - Imported `useTheme` for language
  - Updated weather condition display to use translation
