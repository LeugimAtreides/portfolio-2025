from rest_framework.routers import DefaultRouter

from .views import (
    ProjectViewSet,
    ReferenceViewSet,
    SubscriberViewSet,
    BlogViewSet,
    BlogCommentViewSet,
    ContactMeViewSet,
    AboutMeViewSet,
)

router = DefaultRouter()
router.register(r"projects", ProjectViewSet)
router.register(r"references", ReferenceViewSet)
router.register(r"subscribers", SubscriberViewSet)
router.register(r"blog-posts", BlogViewSet)
router.register(r"blog-comments", BlogCommentViewSet)
router.register(r"about-me", AboutMeViewSet)
router.register(r"contact", ContactMeViewSet)

urlpatterns = router.urls
