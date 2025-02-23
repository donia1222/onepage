import { useState, useEffect } from 'react';
import { Form, useSubmit } from '@remix-run/react';

interface HeaderData {
  title: string;
  subtitle: string;
  logoUrl: string;
}

interface EditHeaderProps {
  initialData: HeaderData;
  actionData?: HeaderData;
}

export default function EditHeader({ initialData, actionData }: EditHeaderProps) {
  const [headerData, setHeaderData] = useState<HeaderData>(initialData);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const submit = useSubmit();

  useEffect(() => {
    if (actionData) {
      setHeaderData(actionData);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      localStorage.setItem('headerData', JSON.stringify(actionData));
    }
  }, [actionData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submit(event.currentTarget, { method: 'post' });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Edit Header</h2>
      {saveSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Changes saved successfully.</span>
        </div>
      )}
      <Form method="post" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={headerData.title}
            onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="subtitle" className="block">Subtitle:</label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={headerData.subtitle}
            onChange={(e) => setHeaderData({ ...headerData, subtitle: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <div>
          <label htmlFor="logoUrl" className="block">Logo URL:</label>
          <input
            type="text"
            id="logoUrl"
            name="logoUrl"
            value={headerData.logoUrl}
            onChange={(e) => setHeaderData({ ...headerData, logoUrl: e.target.value })}
            className="w-full border p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </Form>

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Preview:</h3>
        <div className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex items-center justify-between">
            <img src={headerData.logoUrl || "/placeholder.svg"} alt="Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold">{headerData.title}</h1>
              <p>{headerData.subtitle}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
