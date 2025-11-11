import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { fetchCategories, ApiCategory } from "@/data/fetchData";

interface CategoriesContextType {
  categories: ApiCategory[];
  getCategoryName: (id: string, language: 'uz' | 'kr') => string;
  loading: boolean;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<ApiCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {       
    let mounted = true;
    (async () => {
      try {
        const cats = await fetchCategories();
        if (mounted) {
          setCategories(cats);
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load categories', err);
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  const getCategoryName = (id: string, language: 'uz' | 'kr' = 'uz'): string => {
    const category = categories.find(cat => cat.id === id);
    if (!category) return id;
    return language === 'uz' ? category.name_uz : category.name_kr;
  };

  return (
    <CategoriesContext.Provider value={{ categories, getCategoryName, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoriesContext);
  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider");
  }
  return context;
};
