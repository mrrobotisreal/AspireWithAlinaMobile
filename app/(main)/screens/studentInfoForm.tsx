import { FC, useState } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Button,
  Dialog,
  Divider,
  HelperText,
  Menu,
  Portal,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { ScrollView, View } from "react-native";
import { useIntl } from "react-intl";
import { useLocalSearchParams } from "expo-router";

import { useStudentContext } from "../../../context/studentContext";
import { useThemeContext } from "../../../context/themeContext";

const StudentInfoForm: FC = () => {
  const intl = useIntl();
  const { first_name, last_name, email_address } = useLocalSearchParams();
  const { theme, mediumFont, largeFont } = useThemeContext();
  // const { generateKeyPair } = useEncryption(); // TODO: Implement encryption
  const [nativeLanguage, setNativeLanguage] = useState("");
  const [nativeLanguageText, setNativeLanguageText] = useState("");
  const [isNativeLanguageMenuOpen, setIsNativeLanguageMenuOpen] =
    useState(false);
  const [preferredLanguage, setPreferredLanguage] = useState("");
  const [preferredLanguageText, setPreferredLanguageText] = useState("");
  const [isPreferredLanguageMenuOpen, setIsPreferredLanguageMenuOpen] =
    useState(false);
  const [enteredFirstName, setEnteredFirstName] = useState<string>(
    first_name as string
  );
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [enteredPreferredName, setEnteredPreferredName] = useState<string>(
    first_name as string
  );
  const [isPreferredNameValid, setIsPreferredNameValid] = useState(true);
  const [preferredNameError, setPreferredNameError] = useState<string | null>(
    null
  );
  const [enteredLastName, setEnteredLastName] = useState<string>(
    last_name as string
  );
  const [isLastNameValid, setIsLastNameValid] = useState(true);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [emailAddress, setEmailAddress] = useState<string>(
    email_address as string
  );
  const [isEmailAddressValid, setIsEmailAddressValid] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const [isConfirmInfoDialogOpen, setIsConfirmInfoDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(true);
  const [toastMessage, setToastMessage] = useState(
    intl.formatMessage({
      id: "welcomeScreen_snackbarSuccessfulRegistration",
    })
  );
  const [toastSeverity, setToastSeverity] = useState<"success" | "error">(
    "success"
  );
  const [isLoading, setIsLoading] = useState(false);

  const validateFirstName = (firstName: string) => {
    if (!firstName || firstName.length < 2) {
      setIsFirstNameValid(false);
      // TODO: add translation strings
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_tooShort",
        })
      );
    } else if (firstName.length > 30) {
      setIsFirstNameValid(false);
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_tooLong",
        })
      );
    } else if (!firstName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters
      setIsFirstNameValid(false);
      setFirstNameError(
        intl.formatMessage({
          id: "studentInfoForm_firstNameErrorText_invalid",
        })
      );
    } else {
      setIsFirstNameValid(true);
      setFirstNameError(null);
    }
  };
  const handleFirstNameInput = (firstName: string) => {
    setEnteredFirstName(firstName);
    validateFirstName(firstName);
  };

  const validatePreferredName = (preferredName: string) => {
    if (!preferredName || preferredName.length < 2) {
      setIsPreferredNameValid(false);
      // TODO: add translation strings
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_tooShort",
        })
      );
    } else if (preferredName.length > 30) {
      setIsPreferredNameValid(false);
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_tooLong",
        })
      );
    } else if (!preferredName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters, some symbols, and numbers
      setIsPreferredNameValid(false);
      setPreferredNameError(
        intl.formatMessage({
          id: "studentInfoForm_preferredNameErrorText_invalid",
        })
      );
    } else {
      setIsPreferredNameValid(true);
      setPreferredNameError(null);
    }
  };
  const handlePreferredNameInput = (preferredName: string) => {
    setEnteredPreferredName(preferredName);
    validatePreferredName(preferredName);
  };

  const validateLastName = (lastName: string) => {
    if (!lastName || lastName.length < 2) {
      setIsLastNameValid(false);
      // TODO: add translation strings
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_tooShort",
        })
      );
    } else if (lastName.length > 30) {
      setIsLastNameValid(false);
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_tooLong",
        })
      );
    } else if (!lastName.match(/^[a-zA-Z]+$/)) {
      // TODO: Add support for international characters
      setIsLastNameValid(false);
      setLastNameError(
        intl.formatMessage({
          id: "studentInfoForm_lastNameErrorText_invalid",
        })
      );
    } else {
      setIsLastNameValid(true);
      setLastNameError(null);
    }
  };
  const handleLastNameInput = (lastName: string) => {
    setEnteredLastName(lastName);
    validateLastName(lastName);
  };

  const validateEmailAddress = (email: string) => {
    if (!emailRegex.test(email)) {
      setIsEmailAddressValid(false);
      setEmailError(
        intl.formatMessage({ id: "studentInfoForm_emailErrorText_invalid" })
      );
    } else {
      setIsEmailAddressValid(true);
      setEmailError(null);
    }
  };
  const handleEmailInput = (email: string) => {
    setEmailAddress(email);
    validateEmailAddress(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lengthTooShort",
        })
      );
    } else if (password.length > 16) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lengthTooLong",
        })
      );
    } else if (!password.match(/[a-z]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_lowercase",
        })
      );
    } else if (!password.match(/[A-Z]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_uppercase",
        })
      );
    } else if (!password.match(/[0-9]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({ id: "studentInfoForm_passwordErrorText_number" })
      );
    } else if (!password.match(/[!@#$%^&*]/)) {
      setIsPasswordValid(false);
      setPasswordError(
        intl.formatMessage({
          id: "studentInfoForm_passwordErrorText_specialCharacter",
        })
      );
    } else {
      setIsPasswordValid(true);
      setPasswordError(null);
    }
  };
  const handlePasswordInput = (password: string) => {
    setPassword(password);
    validatePassword(password);
  };

  return (
    <LinearGradient
      style={styles.container}
      colors={[
        "#78290f",
        "#ff7d00",
        "#ffbf69",
        "#cbf3f0",
        "#2ec4b6",
        "#006d77",
        "#001524",
      ]}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
    >
      <Surface style={styles.box}>
        <ScrollView style={styles.scrollContent}>
          <Text variant="headlineMedium">
            {intl.formatMessage(
              { id: "common_welcome" },
              { firstName: enteredFirstName }
            )}
          </Text>
          <Text variant="bodyMedium" style={{ marginBottom: 12 }}>
            {intl.formatMessage({ id: "studentInfoForm_description" })}
          </Text>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_nativeLanguageLabel" })}:
          </Text>
          <Menu
            visible={isNativeLanguageMenuOpen}
            onDismiss={() => setIsNativeLanguageMenuOpen(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsNativeLanguageMenuOpen(true)}
                style={{ marginBottom: 8 }}
                labelStyle={{ color: "black" }}
              >
                {nativeLanguage === ""
                  ? intl.formatMessage({
                      id: "studentInfoForm_selectNativeLanguage",
                      defaultMessage: "Select your native language",
                    })
                  : nativeLanguageText}
              </Button>
            }
            style={{ width: "84%" }}
          >
            <Menu.Item
              onPress={() => {
                setNativeLanguage("uk");
                setNativeLanguageText("Українська мова");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Українська мова"
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("ru");
                setNativeLanguageText("Русский язык");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Русский язык"
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("de");
                setNativeLanguageText("Deutsche Sprache");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="Deutsche Sprache"
            />
            <Menu.Item
              onPress={() => {
                setNativeLanguage("en");
                setNativeLanguageText("English");
                setIsNativeLanguageMenuOpen(false);
              }}
              title="English"
            />
          </Menu>
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {intl.formatMessage({
              id: "studentInfoForm_nativeLanguageHelperText",
            })}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({
              id: "studentInfoForm_preferredLanguageLabel",
            })}
            :
          </Text>
          <Menu
            visible={isPreferredLanguageMenuOpen}
            onDismiss={() => setIsPreferredLanguageMenuOpen(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setIsPreferredLanguageMenuOpen(true)}
                style={{ marginBottom: 8 }}
                labelStyle={{ color: "black" }}
              >
                {preferredLanguage === ""
                  ? intl.formatMessage({
                      id: "studentInfoForm_selectPreferredLanguage",
                      defaultMessage: "Select your preferred language",
                    })
                  : preferredLanguageText}
              </Button>
            }
            style={{ width: "84%" }}
          >
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("en");
                setPreferredLanguageText("English");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="English"
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("uk");
                setPreferredLanguageText("Українська мова");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Українська мова"
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("ru");
                setPreferredLanguageText("Русский язык");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Русский язык"
            />
            <Menu.Item
              onPress={() => {
                setPreferredLanguage("de");
                setPreferredLanguageText("Deutsche Sprache");
                setIsPreferredLanguageMenuOpen(false);
              }}
              title="Deutsche Sprache"
            />
          </Menu>
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {intl.formatMessage({
              id: "studentInfoForm_preferredLanguageHelperText",
            })}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputFirstName" })}:
          </Text>
          <TextInput
            mode="outlined"
            label={intl.formatMessage({ id: "common_firstName" })}
            onChangeText={handleFirstNameInput}
            value={enteredFirstName}
            error={!isFirstNameValid}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.secondary}
          />
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {isFirstNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputFirstNameHelperText",
                })
              : firstNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputPreferredName" })}:
          </Text>
          <TextInput
            mode="outlined"
            label={intl.formatMessage({ id: "common_preferredName" })}
            onChangeText={handlePreferredNameInput}
            value={enteredPreferredName}
            error={!isPreferredNameValid}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.secondary}
          />
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {isPreferredNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputPreferredNameHelperText",
                })
              : preferredNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_inputLastName" })}:
          </Text>
          <TextInput
            mode="outlined"
            label={intl.formatMessage({ id: "common_lastName" })}
            onChangeText={handleLastNameInput}
            value={enteredLastName}
            error={!isLastNameValid}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.secondary}
          />
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {isLastNameValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputLastNameHelperText",
                })
              : lastNameError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_emailInputLabel" })}:
          </Text>
          <TextInput
            mode="outlined"
            label={intl.formatMessage({ id: "common_emailAddress" })}
            onChangeText={handleEmailInput}
            value={emailAddress}
            keyboardType="email-address"
            error={!isEmailAddressValid}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.secondary}
          />
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {isEmailAddressValid
              ? intl.formatMessage({
                  id: "studentInfoForm_inputPreferredNameHelperText",
                })
              : emailError}
          </HelperText>
          <Text
            variant="bodyLarge"
            style={{ fontFamily: largeFont, marginBottom: 6 }}
          >
            {intl.formatMessage({ id: "studentInfoForm_passwordInputLabel" })}:
          </Text>
          <TextInput
            mode="outlined"
            label={intl.formatMessage({ id: "common_passwordTitle" })}
            onChangeText={handlePasswordInput}
            value={password}
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            error={!isPasswordValid}
            outlineColor={theme.colors.primary}
            activeOutlineColor={theme.colors.secondary}
          />
          <HelperText type="info" style={{ marginBottom: 10 }}>
            {isPasswordValid
              ? intl.formatMessage({
                  id: "studentInfoForm_passwordHelperText",
                })
              : passwordError}
          </HelperText>
          <View style={styles.bottomBox}>
            <Button
              mode="contained"
              onPress={() => setIsConfirmInfoDialogOpen(true)}
              style={{
                width: "40%",
                // @ts-ignore
                backgroundColor: theme.colors.secondaryLight,
              }}
              labelStyle={{
                // @ts-ignore
                color: theme.colors.textPrimary,
                fontFamily: largeFont,
              }}
            >
              {intl.formatMessage({ id: "common_submit" })}
            </Button>
          </View>
        </ScrollView>
      </Surface>
      <Portal>
        <Dialog
          visible={isConfirmInfoDialogOpen}
          onDismiss={() => setIsConfirmInfoDialogOpen(false)}
        >
          <Dialog.Title>
            <Text variant="titleLarge" style={{ fontFamily: largeFont }}>
              {intl.formatMessage({ id: "studentInfoForm_confirmInfoTitle" })}
            </Text>
          </Dialog.Title>
          <Dialog.Content>
            <Divider
              style={{
                marginBottom: 12,
                backgroundColor: theme.dark ? "white" : "black",
              }}
            />
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_nativeLanguage",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {nativeLanguageText}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_preferredLanguage",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {preferredLanguageText}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_firstName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {enteredFirstName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_preferredName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {enteredPreferredName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_lastName",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {enteredLastName}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: largeFont, marginBottom: 6 }}
            >
              {intl.formatMessage({
                id: "common_emailAddress",
              })}
            </Text>
            <Text
              variant="bodyLarge"
              style={{ fontFamily: mediumFont, marginBottom: 10 }}
            >
              {emailAddress}
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="outlined"
              labelStyle={{
                color: theme.colors.secondary,
                fontFamily: largeFont,
              }}
              style={{
                borderColor: theme.colors.secondary,
                width: "30%",
              }}
              onPress={() => setIsConfirmInfoDialogOpen(false)}
            >
              {intl.formatMessage({ id: "common_cancel" })}
            </Button>
            <Button
              mode="elevated"
              labelStyle={{
                // @ts-ignore
                color: theme.colors.textPrimary,
                fontFamily: largeFont,
              }}
              style={{
                // @ts-ignore
                backgroundColor: theme.colors.secondaryLight,
                width: "36%",
              }}
              onPress={() => setIsConfirmInfoDialogOpen(false)}
            >
              {intl.formatMessage({ id: "common_confirm" })}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </LinearGradient>
  );
};

export default StudentInfoForm;

const styles = StyleSheet.create({
  bottomBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  box: {
    borderRadius: 12,
    backgroundColor: "white",
    padding: 12,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  headerBox: {
    marginBottom: 10,
  },
  labelText: {
    color: "black",
    fontFamily: "BauhausMedium",
    textAlign: "left",
  },
  scrollContent: {
    paddingBottom: 16,
  },
  titleText: {
    color: "black",
    textAlign: "center",
    fontFamily: "BauhausMedium",
  },
});