import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  headerImage: {
    width: "100%",
    height: height * 0.28,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  headerOverlay: {
    position: "absolute",
    width: "100%",
    height: height * 0.28,
    backgroundColor: "rgba(0,0,0,0.35)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  pageTitle: {
    fontSize: width < 375 ? 24 : 28,
    fontWeight: "700",
    color: "#ffffff",
    textAlign: "center",
    position: "absolute",
    top: height * 0.09,
    width: "100%",
    paddingHorizontal: 20,
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowRadius: 4,
  },

  sectionTitle: {
    fontSize: width < 375 ? 22 : 24,
    color: "#1B4F72",
    fontWeight: "700",
    marginTop: 25,
    marginBottom: 15,
    textAlign: "center",
    letterSpacing: 0.5,
  },

  roomButton: {
    backgroundColor: "#f0f8ff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#2295D1",
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },

  roomButtonText: {
    fontSize: width < 375 ? 16 : 18,
    color: "#1B4F72",
    fontWeight: "600",
    marginLeft: 12,
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 10,
  },

  modalScroll: {
    maxHeight: "80%",
    paddingRight: 10,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1B4F72",
    textAlign: "center",
    marginBottom: 15,
  },

  modalSection: {
    fontSize: 18,
    fontWeight: "700",
    color: "#886633",
    marginTop: 15,
    marginBottom: 8,
    textTransform: "uppercase",
  },

  modalText: {
    fontSize: 15,
    color: "#003c66",
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 10,
  },

  modalBulletText: {
    fontSize: 15,
    color: "#003c66",
    lineHeight: 22,
    marginLeft: 10,
    marginBottom: 6,
  },

  closeButton: {
    backgroundColor: "#1B4F72",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 10,
    elevation: 3,
  },

  closeButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  bottomSpacing: {
    height: 40,
  },
});
