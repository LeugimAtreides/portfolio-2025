from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet,
    ReferenceViewSet,
    SubscriberViewSet,
    BlogViewSet,
    BlogCommentViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'references', ReferenceViewSet)
router.register(r'subscribers', SubscriberViewSet)
router.register(r'blogs', BlogViewSet)
router.register(r'blog-comments', BlogCommentViewSet)

urlpatterns = router.urls
