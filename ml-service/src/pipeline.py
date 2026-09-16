from preprocessing import clean_data, transform_preprocessing


class WasteWiseFullPipeline:
    """
    Combines preprocessing artifacts with the trained model.

    predict() accepts a raw DataFrame and returns
    food_waste_kg predictions.
    """

    def __init__(self, preprocessing_artifacts, model):
        self.preprocessing_artifacts = preprocessing_artifacts
        self.model = model

    def predict(self, raw_df):
        cleaned = clean_data(raw_df)

        processed = transform_preprocessing(
            cleaned,
            self.preprocessing_artifacts
        )

        return self.model.predict(processed)